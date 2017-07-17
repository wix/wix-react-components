import React = require('react');
import {CheckBox} from "../../src/components/checkbox/checkbox";

export const demoCheckBoxText: string = 'I agree to the terms above';
export const demoCheckBoxInitialValue: boolean = false;


export class CheckBoxDemo extends React.Component<{},{value: boolean}> {

    constructor() {
        super();
        this.state = {value: demoCheckBoxInitialValue};
    }

    handleChange = (val: boolean) => {this.setState({value: val})};

    render() {
        return (
            <div>
                <CheckBox value={this.state.value}
                          text={demoCheckBoxText}
                          boxIcon={'/test/assets/uncheckedCheckbox.svg'}
                          tickIcon={'/test/assets/tickMark.svg'}
                          onChange={this.handleChange}/>
                <button disabled={!this.state.value}
                        style={
                            {
                                marginLeft: '50px',
                                verticalAlign: 'top',
                                width: '72px',
                                height: '22px',
                                borderRadius:'20px',
                                borderColor: this.state.value ? ' #4A90E2' : 'grey',
                                backgroundColor: this.state.value ? ' #4A90E2' : '#FFF',
                                color: this.state.value ? '#FFF' : 'grey',
                                borderWidth:'1px'
                            }
                        }>
                    Submit
                </button>
            </div>
        )
    }
}
