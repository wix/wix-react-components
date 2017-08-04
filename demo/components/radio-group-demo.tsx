import React = require('react');
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import {RadioButton, RadioGroup} from '../../src';

@observer
export class RadioGroupDemo extends React.Component<{}, {}> {
    @observable private myValue: string = '';
    @observable private myValue2: string = '';

    public render() {
        return (
            <div data-automation-id="RADIO_GROUP_DEMO">
                <div data-automation-id="GROUP_1">
                    <h3>Children radio group</h3>
                    <RadioGroup onChange={this.onChange}>
                        <RadioButton value="This way!" />
                        <RadioButton value="No, that way!"/>
                        <RadioButton value="But not here" disabled={true} />
                        <RadioButton value="Start here" checked={true} disabled={true} />
                    </RadioGroup>
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.myValue}</span>
                </div>
                <div data-automation-id="GROUP_2">
                    <h3>Data source radio group</h3>
                    <RadioGroup
                        onChange={this.onChange2}
                        location="left"
                        name="name"
                        dataSource={[
                            {value: 'Default'},
                            {value: 'Checked', checked: true},
                            {value: 'Disabled', disabled: true}
                        ]}
                    />
                    <span data-automation-id="RADIO_GROUP_DEMO_VALUE">Value: {this.myValue2}</span>
                </div>
            </div>
        );
    }
    @action
    private onChange = (value: string) => {
        this.myValue = value;
    }

    @action
    private onChange2 = (value: string) => {
        this.myValue2 = value;
    }
}
