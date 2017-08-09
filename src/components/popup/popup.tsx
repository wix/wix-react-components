import React = require('react');
import {CSSProperties} from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import style from './popup.st.css';

export type VerticalPosition =  'top' | 'center' | 'bottom';
export type HorizontalPosition = 'left' | 'center' | 'right';

export interface PositionPoint {
    vertical: VerticalPosition;
    horizontal: HorizontalPosition;
}

export interface PopupProps {
    anchor: HTMLElement;
    open?: boolean;
    anchorPosition?: PositionPoint;
    popupPosition?: PositionPoint;
    syncWidth?: boolean;
    maxHeight?: number;
}

export interface PopupState {
    style: CSSProperties;
}

@SBComponent(style)
export class Popup extends React.Component<PopupProps, PopupState> {
    private static defaultProps: Partial<PopupProps> = {
        open: false,
        anchorPosition: {vertical: 'bottom', horizontal: 'left'},
        popupPosition: {vertical: 'top', horizontal: 'left'},
        syncWidth: true,
        maxHeight: 500
    };
    private popup: HTMLElement | null;

    constructor() {
        super();
        this.state = { style: {position: 'absolute'}};
    }

    public render() {
        if (!this.props.anchor) {
            return null;
        }
        const rootProps = root(this.props, {
            'data-automation-id': 'POPUP',
            'className': 'root',
            'cssStates': {
                open: this.props.open!
            }
        });

        return (
            <div
                {...rootProps}
                ref={this.setPosition}
                style={this.state.style}
            >
                {this.props.children}
            </div>
        );
    }

    private setPosition = (popup: HTMLElement | null) => {
        if (popup) {
            const newStyle = JSON.parse(JSON.stringify(this.state.style));
            const popupRect = popup.getBoundingClientRect();
            const anchorRect = this.props.anchor.getBoundingClientRect();
            let popupWidth = popupRect.width;

            newStyle.maxHeight = this.props.maxHeight;
            if (this.props.syncWidth) {
                newStyle.width = anchorRect.width;
                popupWidth = newStyle.width;
            }

            const anchorHorizontalPos = this.props.anchorPosition!.horizontal;
            const anchorVerticalPos = this.props.anchorPosition!.vertical;

            setTop(newStyle, anchorRect,
                anchorVerticalPos, popup.getBoundingClientRect().height, this.props.popupPosition!.vertical);
            setLeft(newStyle, anchorRect,
                anchorHorizontalPos, popupWidth, this.props.popupPosition!.horizontal);
            if (this.props.syncWidth) {
                newStyle.width = anchorRect.width;
            }
            this.setState({style: newStyle});
        }
    }
}

function setTop(popupStyle: CSSProperties, anchorRect: ClientRect,
                anchorPosition: VerticalPosition, popupHeight: number, popupPoistion: VerticalPosition) {
    switch (popupPoistion) {
        case 'top':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition) - (popupHeight / 2);
            break;
        case 'bottom':
            popupStyle.top = getVerticalReference(anchorRect, anchorPosition) - popupHeight;
            break;
    }
}

function setLeft(popupStyle: CSSProperties, anchorRect: ClientRect,
                 anchorPosition: HorizontalPosition, popupWidth: number, popupPoistion: HorizontalPosition) {
    switch (popupPoistion) {
        case 'left':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition);
            break;
        case 'center':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition) - (popupWidth / 2);
            break;
        case 'right':
            popupStyle.left = getHorizontalReference(anchorRect, anchorPosition) - popupWidth;
            break;
    }
}

function getVerticalReference(rect: ClientRect, anchorPosition: VerticalPosition): number {
    const yOffset = window.scrollY ? window.scrollY : window.pageYOffset;
    if (anchorPosition === 'center') {
        return yOffset + rect.top + (rect.height / 2);
    } else {
        return yOffset + rect[anchorPosition as 'top' | 'bottom'];
    }
}

function getHorizontalReference(rect: ClientRect, anchorPosition: HorizontalPosition): number {
    const xOffset = window.scrollX ? window.scrollX : window.pageXOffset;
    if (anchorPosition === 'center') {
        return xOffset + rect.left + (rect.width / 2);
    } else {
        return xOffset + rect[anchorPosition as 'left' | 'right'];
    }
}
