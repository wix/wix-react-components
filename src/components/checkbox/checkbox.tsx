import React = require('react');
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import style from './checkbox.st.css';

export interface CheckBoxProps {
    value: boolean;
    boxIcon: React.ComponentType<CheckBoxIconProps>;
    tickIcon: React.ComponentType<CheckBoxIconProps>;
    indeterminateIcon: React.ComponentType<CheckBoxIconProps>;
    onChange: (value: boolean) => any;
    children?: any;
    disabled: boolean;
    readonly: boolean;
    indeterminate: boolean;
}

export interface CheckBoxIconProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}

const DefaultCheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.boxIconDefault}
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M.5.5h15v15H.5z"/>
        </svg>
    );
};

const DefaultTickMarkSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.tickIcon}
             data-automation-id="CHECKBOX_TICKMARK"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    );
};

const DefaultIndeterminateSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.indeterminateIcon}
             data-automation-id="CHECKBOX_INDETERMINATE"
             xmlns="http://www.w3.org/2000/svg" width="15" height="15">
            <line x1="4" y1="8" x2="12" y2="8"/>
        </svg>
    );
};

@SBComponent(style)
export class CheckBox extends React.Component<Partial<CheckBoxProps>, {}> {
    static defaultProps: CheckBoxProps = {
        value: false,
        boxIcon: DefaultCheckBoxSVG,
        tickIcon: DefaultTickMarkSVG,
        indeterminateIcon: DefaultIndeterminateSVG,
        onChange: (value: boolean) => {
        },
        disabled: false,
        readonly: false,
        indeterminate: false
    };

    render() {
        const BoxIcon = this.props.boxIcon!;
        const IndeterminateIcon = this.props.indeterminateIcon!;
        const TickIcon = this.props.tickIcon!;
        const rootProps = root(this.props, {
            'data-automation-id': 'CHECKBOX_ROOT',
            'className': 'root',
            'cssStates': {
                checked: this.props.value!,
                disabled: this.props.disabled!,
                readonly: this.props.readonly!,
                indeterminate: this.props.indeterminate!
            },
            'onClick': (event: any) => executeClickHandler(this.props.onChange!, !this.props.value, this.props.disabled!, this.props.readonly!, this.props.indeterminate!)
        }, ['onChange']);

        return (
            <div {...rootProps}>

                <BoxIcon value={this.props.value} indeterminate={this.props.indeterminate}
                         disabled={this.props.disabled}/>

                {this.props.indeterminate ?
                    <IndeterminateIcon value={this.props.value} indeterminate={this.props.indeterminate}
                                       disabled={this.props.disabled}/> :
                    this.props.value && <TickIcon value={this.props.value} indeterminate={this.props.indeterminate}
                                                  disabled={this.props.disabled}/>
                }

                {this.props.children}

                <input data-automation-id="NATIVE_CHECKBOX"
                       type="checkbox"
                       className="nativeCheckbox"
                       checked={this.props.value}
                       onChange={() => {
                       }}
                       disabled={this.props.disabled}/>
            </div>
        );
    }
}

function executeClickHandler(handler: (value: boolean) => any, value: boolean, isDisabled: boolean, isReadOnly: boolean, isIndeterminate: boolean): void {
    if (!isDisabled && !isReadOnly) {
        isIndeterminate ? handler(true) : handler(value);
    }
}
