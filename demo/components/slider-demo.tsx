import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ContextProvider, Slider} from '../../src';
import {SliderView} from '../../src/components/slider/slider-view';
import {ChangeEvent} from '../../src/types/events';
import style from './slider-demo.st.css';

export interface SliderDemoState {
    value: number;
    rawValue: string;
}

@stylable(style)
export class SliderDemo extends React.Component<{}, SliderDemoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value: 50,
            rawValue: '50'
        };
    }

    public render() {
        const min = 0;
        const max = 100;

        return (
            <table cellSpacing="24px">
                <thead>
                    <tr>
                        <th className="table-head-cell">Default Slider View</th>
                        <th className="table-head-cell">Disabled Slider View</th>
                        <th className="table-head-cell">Slider with step View</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="vertical-demo">
                            <SliderView
                                relativeValue={70}
                                relativeStep={1}
                                min={0}
                                max={100}
                                step={1}
                                active={false}
                                onFocus={event => console.log('onFocus', event)}
                                onBlur={event => console.log('onBlur', event)}

                                onSliderAreaKeyDown={event => console.log('onSliderAreaKeyDown', event)}

                                onSliderAreaMouseDown={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseDown', event, slider, focused)
                                }
                                onSliderAreaMouseMove={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseMove', event, slider, focused)
                                }
                                onSliderAreaMouseUp={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseUp', event, slider, focused)
                                }

                                onSliderAreaTouchStart={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchStart', event, slider, focused)
                                }
                                onSliderAreaTouchMove={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchMove', event, slider, focused)
                                }
                                onSliderAreaTouchEnd={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchEnd', event, slider, focused)
                                }
                            />
                        </td>
                        <td className="vertical-demo">
                            <SliderView
                                relativeValue={70}
                                relativeStep={1}
                                min={0}
                                max={100}
                                step={1}
                                active={false}
                                onFocus={event => console.log('onFocus', event)}
                                onBlur={event => console.log('onBlur', event)}

                                onSliderAreaKeyDown={event => console.log('onSliderAreaKeyDown', event)}

                                onSliderAreaMouseDown={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseDown', event, slider, focused)
                                }
                                onSliderAreaMouseMove={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseMove', event, slider, focused)
                                }
                                onSliderAreaMouseUp={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseUp', event, slider, focused)
                                }

                                onSliderAreaTouchStart={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchStart', event, slider, focused)
                                }
                                onSliderAreaTouchMove={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchMove', event, slider, focused)
                                }
                                onSliderAreaTouchEnd={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchEnd', event, slider, focused)
                                }
                            />
                        </td>
                        <td className="vertical-demo">
                            <SliderView
                                relativeValue={70}
                                relativeStep={1}
                                min={0}
                                max={100}
                                step={1}
                                active={false}
                                onFocus={event => console.log('onFocus', event)}
                                onBlur={event => console.log('onBlur', event)}

                                onSliderAreaKeyDown={event => console.log('onSliderAreaKeyDown', event)}

                                onSliderAreaMouseDown={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseDown', event, slider, focused)
                                }
                                onSliderAreaMouseMove={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseMove', event, slider, focused)
                                }
                                onSliderAreaMouseUp={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaMouseUp', event, slider, focused)
                                }

                                onSliderAreaTouchStart={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchStart', event, slider, focused)
                                }
                                onSliderAreaTouchMove={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchMove', event, slider, focused)
                                }
                                onSliderAreaTouchEnd={
                                    (event, slider, focused) =>
                                        console.log('onSliderAreaTouchEnd', event, slider, focused)
                                }

                                axis={'y'}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">Default Slider</th>
                        <th className="table-head-cell">Disabled Slider</th>
                        <th className="table-head-cell">Slider with step</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Slider
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                value={this.state.value}
                                min={min}
                                max={max}
                                disabled={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                onChange={this.onSliderChange}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">
                            Slider with error state<br />
                            <span style={{color: '#777', fontSize: '12px'}}>To be continued...</span>
                        </th>
                        <th className="table-head-cell">Slider with label</th>
                        <th className="table-head-cell">Slider with tooltip</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Slider
                                value={this.state.value}
                                min={min}
                                max={max}
                                error={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                value={this.state.value}
                                min={min}
                                max={max}
                                label="It's simple slider."
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                                onInput={this.onSliderInput}
                                tooltip={<div className="tooltip">{this.state.rawValue}</div>}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">Slider axis="y"</th>
                        <th className="table-head-cell">Slider axis="x-reverse"</th>
                        <th className="table-head-cell">Slider axis="y-reverse"</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="vertical-demo">
                            <Slider
                                axis={'y'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                axis={'x-reverse'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                axis={'y-reverse'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">Slider with marks</th>
                        <th className="table-head-cell">Vertical Slider with marks</th>
                        <th className="table-head-cell">Reverse Slider with marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="vertical-demo">
                            <Slider
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                marks={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                axis={'y'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                marks={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                axis={'x-reverse'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                marks={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">Slider with RTL</th>
                        <th className="table-head-cell">Reverse Slider with RTL</th>
                        <th className="table-head-cell">Slider with RTL and marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ContextProvider
                                dir="rtl"
                            >
                                <Slider
                                    value={this.state.value}
                                    min={min}
                                    max={max}
                                    onChange={this.onSliderChange}
                                />
                            </ContextProvider>
                        </td>
                        <td>
                            <ContextProvider
                                dir="rtl"
                            >
                                <Slider
                                    value={this.state.value}
                                    min={min}
                                    max={max}
                                    axis="x-reverse"
                                    onChange={this.onSliderChange}
                                />
                            </ContextProvider>
                        </td>
                        <td>
                            <ContextProvider
                                dir="rtl"
                            >
                                <Slider
                                    value={this.state.value}
                                    min={min}
                                    max={max}
                                    step={10}
                                    marks={true}
                                    onChange={this.onSliderChange}
                                />
                            </ContextProvider>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    private onSliderChange = ({value}: ChangeEvent<number>) => {
        this.setState({
            value,
            rawValue: String(value)
        });
    }

    private onSliderInput = ({value}: ChangeEvent<string>) => {
        this.setState({
            rawValue: value
        });
    }
}
