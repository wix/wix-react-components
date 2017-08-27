import {observer} from 'mobx-react';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import styles from './date-picker.st.css';

export interface DayProps {
    day: number;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    onSelect?(day: number): void;
}

@SBComponent(styles)
@observer
export class Day extends React.Component<DayProps, {}> {
    public render() {
        const cssStates = {
            focused: this.props.focused!,
            selected: this.props.selected!,
            current: this.props.currentDay!,
            inactive: this.props.partOfNextMonth! || this.props.partOfPrevMonth!
        };

        return (
            <span
                {...root(this.props,
                    {   'data-automation-id': '',
                        'className': 'calendarItem day'
                    }) as React.HTMLAttributes<HTMLSpanElement>
                }
                onMouseDown={this.onMouseDown}
                cssStates={cssStates}
            >
                {this.props.day}
            </span>
        );
    }

    private onMouseDown: React.EventHandler<React.SyntheticEvent<Element>> = event => {
        event.preventDefault();

        if (this.props.onSelect) {
            this.props.onSelect(this.props.day);
        }
    }
}
