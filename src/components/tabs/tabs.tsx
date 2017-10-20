import * as PropTypes from 'prop-types';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {isRTLContext} from '../../utils';
import {SelectionList, SelectionListOption as Option} from '../selection-list';
import {TabProps} from './tab';
import styles from './tabs.st.css';

export type TabsOrientation
    = 'horizontal-top'
    | 'horizontal-bottom'
    | 'vertical-before'
    | 'vertical-after';

export interface TabsProps extends properties.Props {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    orientation?: TabsOrientation;
    unmountInactiveTabs?: boolean;
    onChange?: (event: ChangeEvent<string>) => void;
    children: Array<React.ReactElement<TabProps>>;
}

@properties
@stylable(styles)
export class Tabs extends React.Component<TabsProps> {
    public static defaultProps: Partial<TabsProps> = {
        orientation: 'horizontal-top'
    };

    public static contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };

    public render() {
        const {children, orientation, value: selected} = this.props;

        return (
            <div
                style-state={{
                    'horizontal-top': orientation === 'horizontal-top',
                    'horizontal-bottom': orientation === 'horizontal-bottom',
                    'vertical-before': orientation === 'vertical-before',
                    'vertical-after': orientation === 'vertical-after',
                    'rtl': isRTLContext(this.context)
                }}
            >
                <SelectionList
                    className="tabList"
                    tabIndex={0}
                    data-automation-id="TAB_LIST"
                    value={selected}
                    onChange={this.handleChange}
                >
                    {children.map(
                        ({props: {label, value, disabled}}) =>
                            <Option
                                key={value}
                                value={value}
                                disabled={disabled}
                            >{label}
                            </Option>
                    )}
                </SelectionList>
                <div
                    className="tabPanel"
                    data-automation-id="TAB_PANEL"
                >
                    {children.filter(({props: {value}}) => value === selected)}
                </div>
            </div>
        );
    }

    private handleChange = (event: ChangeEvent<string>) =>
        typeof this.props.onChange === 'function' ? this.props.onChange(event) : null
}
