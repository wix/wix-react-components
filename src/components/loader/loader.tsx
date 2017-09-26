import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {circle} from './circle';
import styles from './loader.st.css';

export interface LoaderProps {
    type?: 'circle'; // TODO add 'dots' and 'lines'
    delay?: number;
    text?: string;
}

export interface LoaderState {
    active: boolean;
}

const loaders = {
    circle
};

@stylable(styles)
export class Loader extends React.Component<LoaderProps, LoaderState> {
    public static defaultProps = {
        type: 'circle'
    };
    private timer: number;

    public constructor(props: LoaderProps) {
        super();
        this.state = {
            active: !props.delay
        };
    }

    public componentWillMount() {
        this.setTimer(this.props);
    }

    public componentWillReceiveProps(props: LoaderProps) {
        this.setTimer(props);
    }

    public componentWillUnmount() {
        clearTimeout(this.timer!);
    }

    public render() {
        const {type, text} = this.props;

        if (!this.state.active) {
            return null;
        }

        return (
            <div data-automation-id="LOADER">
                {loaders[type!]()}
                {text &&
                    <span
                        data-automation-id="LOADER_TEXT"
                        className="text"
                        children={text}
                    />
                }
            </div>
        );
    }

    private setTimer(props: LoaderProps) {
        if (props.delay) {
            clearTimeout(this.timer!);
            this.setState({active: false});
            this.timer = window.setTimeout(() => {
                this.setState({active: true});
            }, props.delay);
        } else if (!this.state.active) {
            this.setState({active: true});
        }
    }

}