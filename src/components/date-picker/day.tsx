import {observer} from 'mobx-react';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {StylableProps} from '../../types/props';
import styles from './date-picker.st.css';

export interface DayProps extends StylableProps {
    day: Date;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    disabled?: boolean;
    onSelect?(day: Date): void;
}

@stylable(styles)
@properties
@observer
export class Day extends React.Component<DayProps> {
    public render() {
        const styleState = {
            focused: this.props.focused!,
            selected: this.props.selected!,
            current: this.props.currentDay!,
            inactive: this.props.partOfNextMonth! || this.props.partOfPrevMonth!,
            disabled: this.props.disabled
        };

        return (
            <span
                className="calendarItem day"
                onMouseDown={this.onMouseDown}
                style-state={styleState}
            >
                {this.props.day.getDate()}
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
