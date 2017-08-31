import * as keycode from 'keycode';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import GlobalEvent from '../../common/global-event';
import {noop} from './../../utils/noop';
import style from './slider.st.css';

const AXISES = {
    x: 'x',
    y: 'y',
    xReverse: 'x-reverse',
    yReverse: 'y-reverse'
};
const CONTINUOUS_STEP = 'any';
const DEFAULT_STEP = 1;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_VALUE = DEFAULT_MIN;
const DEFAULT_AXIS = AXISES.x;

enum ChangeDirrection {
    ascend,
    descend
}

export type PointerEvent = MouseEvent | TouchEvent;
export type Step = number | 'any';
export type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';
export interface PointerPosition {
    clientX: number;
    clientY: number;
}
export interface SliderProps {
    value?: number;
    min?: number;
    max?: number;
    step?: Step;
    axis?: AxisOptions;

    name?: string;
    label?: string;

    marks?: boolean;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;

    onChange?(value: number): void;
    onInput?(value: string): void;

    onFocus?(event: React.SyntheticEvent<HTMLElement>): void;
    onBlur?(event: React.SyntheticEvent<HTMLElement>): void;

    onDragStart?(event: PointerEvent): void;
    onDrag?(event: PointerEvent): void;
    onDragStop?(event: PointerEvent): void;
}
export interface SliderState {
    relativeValue: number;
    relativeStep: Step;
    isActive: boolean;
    isVertical: boolean;
    isReverse: boolean;
}

@SBComponent(style)
export class Slider extends React.Component<SliderProps, SliderState> {
    public static defaultProps = {
        min: DEFAULT_MIN,
        max: DEFAULT_MAX,
        step: DEFAULT_STEP,
        axis: DEFAULT_AXIS,

        onChange: noop,
        onInput: noop,

        onFocus: noop,
        onBlur: noop,

        onDragStart: noop,
        onDrag: noop,
        onDragStop: noop
    };

    private focusableElement: HTMLElement;

    private sliderArea: HTMLElement;

    private isSliderMounted: boolean = false;

    private isActive: boolean = false;

    constructor(props: SliderProps, context?: any) {
        super(props, context);

        const {min, max, step, axis} = this.props;

        this.state = {
            relativeValue: this.getRelativeValue(this.getDefaultValue(), min!, max!, step),
            relativeStep: this.getRelativeStep(step, min!, max!),
            isActive: false,
            isVertical: this.isVertical(axis!),
            isReverse: this.isReverse(axis!)
        };
    }

    public render() {
        return (
            <div
                {...root(this.props, {
                    'data-automation-id': 'SLIDER-CONTAINER',
                    'className': 'container'
                })}
                cssStates={{
                    'active': this.state.isActive,
                    'disabled': Boolean(this.props.disabled),
                    'error': Boolean(this.props.error),
                    'x': this.props.axis === AXISES.x,
                    'y': this.props.axis === AXISES.y,
                    'x-reverse': this.props.axis === AXISES.xReverse,
                    'y-reverse': this.props.axis === AXISES.yReverse
                }}
            >
                <GlobalEvent
                    mousemove={this.onSliderAreaMouseMove}
                    mouseup={this.onSliderAreaMouseUp}
                    touchmove={this.onSliderAreaTouchMove}
                    touchend={this.onSliderAreaTouchEnd}
                    touchcancel={this.onSliderAreaTouchEnd}
                />
                <input
                    className="native-input"
                    value={this.props.value}
                    type="hidden"
                    data-automation-id="SLIDER-NATIVE-INPUT"
                    name={this.props.name}
                    required={this.props.required}
                    disabled={this.props.disabled}
                />
                <div
                    ref={el => this.sliderArea = el as HTMLElement}
                    className="slider"
                    data-automation-id="SLIDER"
                    title={this.props.label}

                    onMouseDown={this.onSliderAreaMouseDown}
                    onTouchStart={this.onSliderAreaTouchStart}
                >
                    <div
                        className="track"
                        data-automation-id="SLIDER-TRACK"
                    >
                        <div
                            className="progress"
                            data-automation-id="SLIDER-PROGRESS"
                            style={
                                this.state.isVertical ?
                                    {height: `${this.state.relativeValue}%`} :
                                    {width: `${this.state.relativeValue}%`}
                            }
                        />
                        <a
                            ref={el => this.focusableElement = el as HTMLElement}
                            className="handle"
                            data-automation-id="SLIDER-HANDLE"
                            style={
                                this.state.isReverse ?
                                    (this.state.isVertical ?
                                        {top: `${this.state.relativeValue}%`} :
                                        {right: `${this.state.relativeValue}%`}) :
                                    (this.state.isVertical ?
                                        {bottom: `${this.state.relativeValue}%`} :
                                        {left: `${this.state.relativeValue}%`})
                            }

                            onKeyDown={this.onSliderAreaKeyDown}

                            onFocus={this.onSliderFocus}
                            onBlur={this.onSliderBlur}

                            role="slider"
                            aria-label={this.props.label}
                            aria-orientation={this.state.isVertical ? 'vertical' : 'horizontal'}
                            aria-valuemin={`${this.props.min}`}
                            aria-valuemax={`${this.props.max}`}
                            aria-valuenow={`${this.props.value}`}
                            tabIndex={this.props.disabled ? -1 : 0}
                        >
                            <div
                                className="tooltip"
                                data-automation-id="SLIDER-TOOLTIP"
                            >
                                {this.getTooltip()}
                            </div>
                        </a>
                        {this.getMarks()}
                    </div>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        this.isSliderMounted = true;
    }

    public componentWillUnmount() {
        this.isSliderMounted = false;
    }

    public componentWillReceiveProps(nextProps: SliderProps) {
        if (this.isActive) {
            return;
        }

        let value = nextProps.value === undefined ? this.props.value : nextProps.value;
        const min = nextProps.min === undefined ? this.props.min : nextProps.min;
        const max = nextProps.max === undefined ? this.props.max : nextProps.max;
        const step = nextProps.step === undefined ? this.props.step : nextProps.step;

        if (value && (value > max!)) {
            value = max;
        }
        if (value && (value < min!)) {
            value = min;
        }

        this.setState({
            relativeValue: this.getRelativeValue(value!, min!, max!, step),
            relativeStep: this.getRelativeStep(step, min!, max!),
            isVertical: this.isVertical(nextProps.axis || this.props.axis!),
            isReverse: this.isReverse(nextProps.axis || this.props.axis!)
        });
    }

    private getDefaultValue() {
        const {value, min} = this.props;
        return typeof value === 'undefined' ?
            (typeof min !== 'undefined' ? min : DEFAULT_VALUE) :
            value;
    }

    private getTooltip(): number | string | React.ReactElement<any> | undefined {
        return React.Children
            .toArray(this.props.children)
            .find(
                item => typeof item === 'object' ?
                    item.props['data-slot'] === 'tooltip' :
                    false
            );
    }

    private getMarks(): JSX.Element[] {
        const {marks, min, max, step} = this.props;
        const {relativeStep, relativeValue, isReverse, isVertical} = this.state;
        const range = (max! - min!);
        const markElements: JSX.Element[] = [];
        if (
            !marks ||
            typeof step === 'undefined' ||
            step === CONTINUOUS_STEP ||
            relativeStep === CONTINUOUS_STEP ||
            range % step
        ) {
            return markElements;
        }

        const numberOfMarks = range / step;

        for (let i = 0; i <= numberOfMarks; i++) {
            const position = relativeStep * i;
            const className = position <= relativeValue ?
                'markProgress' :
                'markTrack';

            markElements.push((
                <span
                    className={className}
                    key={i}
                    style={
                        isReverse ?
                            (isVertical ?
                                {top: `${position}%`} :
                                {right: `${position}%`}) :
                            (isVertical ?
                                {bottom: `${position}%`} :
                                {left: `${position}%`})

                    }
                    data-automation-id={`SLIDER-MARKS-${i}`}
                />
            ));
        }

        return markElements;
    }

    private onSliderFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onFocus!(event);
    }

    private onSliderBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onBlur!(event);
    }

    private isVertical(axis: AxisOptions): boolean {
        return axis === AXISES.y || axis === AXISES.yReverse;
    }

    private isReverse(axis: AxisOptions): boolean {
        return axis === AXISES.xReverse || axis === AXISES.yReverse;
    }

    private increaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirrection.ascend, multiplier, toEdge);
    }

    private decreaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirrection.descend, multiplier, toEdge);
    }

    private changeValue(dirrection: ChangeDirrection, multiplier: number = 1, toEdge: boolean = false) {
        const {relativeValue} = this.state;
        let newRelativeValue: number;

        const relativeStep = this.state.relativeStep === CONTINUOUS_STEP ?
            1 :
            this.state.relativeStep * multiplier;

        if (toEdge) {
            newRelativeValue = dirrection === ChangeDirrection.ascend ?
                100 :
                0;
        } else {
            newRelativeValue = this.getValueInRange(
                dirrection === ChangeDirrection.ascend ?
                    Math.floor(relativeValue / relativeStep) * relativeStep + relativeStep :
                    Math.ceil(relativeValue / relativeStep) * relativeStep - relativeStep,
                0, 100
            );
        }

        const newAbsoluteValue = this.getAbsoluteValue(newRelativeValue);

        if (newRelativeValue !== this.state.relativeValue) {
            this.setState({
                relativeValue: newRelativeValue
            });
        }

        this.props.onInput!(String(newAbsoluteValue));
        if (newAbsoluteValue !== this.props.value) {
            this.props.onChange!(newAbsoluteValue);
        }
    }

    private getRelativeStep(step: Step | undefined, min: number, max: number): Step {
        if (typeof step === 'undefined' || step === CONTINUOUS_STEP) {
            return CONTINUOUS_STEP;
        }
        return 100 * step / (max - min);
    }

    private getRelativeValue(value: number, min: number, max: number, step?: Step): number {
        const normilizedMax = max - min;
        const normilizedValue = value - min;

        const relativeValue = (normilizedValue * 100) / normilizedMax;

        return this.getValueInRange(relativeValue, 0, 100);
    }

    private getAbsoluteValue(relativeValue: number): number {
        const range = this.props.max! - this.props.min!;
        const absoluteValue = range * relativeValue / 100 + this.props.min!;
        return this.getValueInRange(absoluteValue, this.props.min!, this.props.max!);
    }

    private getValueInRange(value: number, min: number, max: number): number {
        return value < min ? min : (value > max ? max : value);
    }

    private getValueFromElementAndPointer(element: HTMLElement, {clientX, clientY}: PointerPosition): number {
        const {relativeStep, isVertical, isReverse} = this.state;
        const {top, left, height, width} = element.getBoundingClientRect();

        const sliderOffset = isVertical ? top : left;
        const sliderSize = isVertical ? height : width;
        const sliderCoordinate = isVertical ? clientY : clientX;

        let relativeValue = this.getRelativeValue(sliderCoordinate - sliderOffset, 0, sliderSize);

        relativeValue = isReverse ?
            (isVertical ? relativeValue : 100 - relativeValue) :
            (isVertical ? 100 - relativeValue : relativeValue);

        if (typeof relativeStep === 'undefined' || relativeStep === CONTINUOUS_STEP) {
            return relativeValue;
        }
        let value = Math.round(relativeValue / relativeStep) * relativeStep;
        value = value > 100 ?
            value - relativeStep :
            (value < 0 ? value + relativeStep : value);

        return value;
    }

    private onSliderAreaMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        event.preventDefault();
        this.focusableElement.focus();

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);

        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        this.onDragStart(event.nativeEvent);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaMouseMove = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);

        requestAnimationFrame(() => {
            if (!this.isSliderMounted) {
                return;
            }

            this.setState({
                relativeValue
            });
        });

        this.onDrag(event);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaMouseUp = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);
        const value = this.getAbsoluteValue(relativeValue);

        this.setState({
            relativeValue,
            isActive: false
        });
        this.isActive = false;

        this.focusableElement.focus();
        this.onDragStop(event);
        this.props.onChange!(value);
    }

    private onSliderAreaTouchStart = (event: React.TouchEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }
        const focusableElement = event.currentTarget;
        this.focusableElement = focusableElement;

        focusableElement.focus();

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.touches[0]);

        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        event.preventDefault();

        this.onDragStart(event.nativeEvent);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaTouchMove = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.changedTouches[0]);
        requestAnimationFrame(() => {
            if (!this.isSliderMounted) {
                return;
            }

            this.setState({
                relativeValue
            });
        });

        event.preventDefault();

        this.onDrag(event);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaTouchEnd = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.changedTouches[0]);
        const value = this.getAbsoluteValue(relativeValue);

        this.setState({
            relativeValue,
            isActive: false
        });
        this.isActive = false;

        this.onDragStop(event);
        this.props.onChange!(value);
    }

    private onSliderAreaKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (this.isActive || this.props.disabled) {
            event.preventDefault();
            return;
        }

        const {isReverse} = this.state;
        const {ctrlKey, shiftKey} = event;
        const ctrlOrShiftPressed = shiftKey || ctrlKey;

        switch (keycode(event.keyCode)) {
            case 'up':
                isReverse ?
                    this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                    this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                break;
            case 'right':
                isReverse ?
                    this.decreaseValue(ctrlOrShiftPressed, 1) :
                    this.increaseValue(ctrlOrShiftPressed, 1);
                break;
            case 'down':
                isReverse ?
                    this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                    this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                break;
            case 'left':
                isReverse ?
                    this.increaseValue(ctrlOrShiftPressed, 1) :
                    this.decreaseValue(ctrlOrShiftPressed, 1);
                break;
            case 'home':
                isReverse ?
                    this.increaseValue(true) :
                    this.decreaseValue(true);
                break;
            case 'end':
                isReverse ?
                    this.decreaseValue(true) :
                    this.increaseValue(true);
                break;
            case 'page up':
                this.increaseValue(false, 10);
                break;
            case 'page down':
                this.decreaseValue(false, 10);
                break;
            default:
                return;
        }

        event.preventDefault();
    }

    private onDragStart(event: PointerEvent) {
        this.props.onDragStart!(event);
    }

    private onDrag(event: PointerEvent) {
        this.props.onDrag!(event);
    }

    private onDragStop(event: PointerEvent) {
        this.props.onDragStop!(event);
    }
}
