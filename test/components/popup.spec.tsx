import React = require('react');
import {CSSProperties} from 'react';
import {selectDom} from 'test-drive';
import { ClientRenderer, expect, simulate } from 'test-drive-react';
import {PopupDemo} from '../../demo/components/popup-demo';
import {HorizontalPosition, Popup, VerticalPosition} from '../../src/components/';

const popup = 'POPUP';
const container = 'POPUP_DEMO_DIV';

describe('<Popup />', function() {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

    afterEach(function() {
        clientRenderer.cleanup();
    });

    describe('The popup user', function() {
        it('clicks on the parent and the popup opens', async function() {
            const {select, waitForDom} = clientRenderer.render(<PopupDemo />);

            await waitForDom(() => {
                expect(select(container)).to.be.present();
                expect(select(container, popup)).to.be.absent();
            });
            (select(container) as HTMLDivElement).click();
            return waitForDom(() => {
                expect(bodySelect(popup)).to.be.present();
            });
        });
    });

    it('renders a hidden pop up', function() {
        let div;
        const {select, waitForDom} = clientRenderer.render(
            <div>
                <div ref={elem => div = elem}>Anchor</div>
                <Popup anchor={div}>
                    <span>Popup Body</span>
                </Popup>
            </div>
        );

        return waitForDom(() => {
            expect(select(popup)).to.not.be.undefined;
            expect(select(popup)).to.be.absent();
        });
    });

    it('displays the popup and renders its children if the open prop is given', async function() {
        let div: HTMLDivElement;
        const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

        await waitForDom(() => {
            expect(div).to.be.present();
        });

        clientRenderer.render(
            <Popup
                anchor={div!}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitForDom(() => {
            expect(bodySelect(popup)).to.be.present();
            expect(bodySelect(popup, 'SPAN')).to.be.present();
        });
    });

    it('syncs the popup width', async function() {
        let div: HTMLDivElement;
        const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

        await waitForDom(() => {
            expect(div).to.be.present();
        });

        clientRenderer.render(
            <Popup
                anchor={div!}
                syncWidth={true}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitForDom(() => {
            expect(bodySelect(popup)!.getBoundingClientRect().width).to.equal(div.getBoundingClientRect().width);
        });
    });

    it('sets the default maxHeight', async function() {
        let div: HTMLDivElement;
        const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

        await waitForDom(() => {
            expect(div).to.be.present();
        });

        clientRenderer.render(
            <Popup
                anchor={div!}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitForDom(() => {
            expect((bodySelect(popup)! as HTMLElement).style.maxHeight).to.equal('500px');
        });
    });

    it('sets and enforces the maxHeight', async function() {
        let div: HTMLDivElement;
        const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

        await waitForDom(() => {
            expect(div).to.be.present();
        });

        clientRenderer.render(
            <Popup
                anchor={div!}
                maxHeight={5}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitForDom(() => {
            expect((bodySelect(popup)! as HTMLElement).style.maxHeight).to.equal('5px');
            expect((bodySelect(popup)! as HTMLElement).getBoundingClientRect().height).to.equal(5);
        });
    });

    describe('Layout tests', function() {
        const verticalArray = ['top', 'center', 'bottom'];
        const horizontalArray = ['left', 'center', 'right'];
        const divDim: CSSProperties = {
            position: 'absolute',
            top: '150px',
            left: '150px',
            width: '150px',
            height: '150px',
            border: '1px solid blue'};

        // Level one: popup position, level two: anchor position
        const topResults = getLayoutTest('vertical');
        const leftResults = getLayoutTest('horizontal');

        verticalArray.forEach((popupVertical: VerticalPosition) => {
            horizontalArray.forEach((popupHorizontal: HorizontalPosition) => {
                verticalArray.forEach((anchorVertical: VerticalPosition) => {
                    horizontalArray.forEach((anchorHorizontal: HorizontalPosition) => {
                        it(
                            `Popup position: V: ${popupVertical} H: ${popupHorizontal};
                            Anchor position: V: ${anchorVertical} H: ${anchorHorizontal}`, async function() {
                            let div: HTMLDivElement;
                            const {waitForDom} = clientRenderer.render(
                                <div
                                    style={divDim}
                                    ref={(elem: HTMLDivElement) => div = elem}
                                >
                                    Anchor
                                </div>
                            );

                            await waitForDom(() => {
                                expect(div).to.be.present();
                            });
                            clientRenderer.render(
                                <Popup
                                    anchor={div!}
                                    anchorPosition={{vertical: anchorVertical, horizontal: anchorHorizontal}}
                                    popupPosition={{vertical: popupVertical, horizontal: popupHorizontal}}
                                    open={true}
                                >
                                    <div
                                        style={{background: 'green', color: 'white'}}
                                    >
                                    <span
                                        data-automation-id="SPAN"
                                    >
                                        Popup Body
                                    </span>
                                        <div>some more stuff</div>
                                    </div>
                                </Popup>);

                            return waitForDom(() => {
                                expect(
                                    topResults[popupVertical][anchorVertical](div, bodySelect(popup) as HTMLElement),
                                    'vertical test failed'
                                ).to.be.true;
                                expect(
                                    leftResults[popupHorizontal][anchorHorizontal](
                                        div, bodySelect(popup) as HTMLElement
                                    ), 'horizontal test failed'
                                ).to.be.true;
                            });
                        });
                    });
                });
            });
        });
    });
});

function getLayoutTest(axis: 'vertical' | 'horizontal') {
    let start: 'left' | 'top' = 'top';
    let end: 'bottom' | 'right' = 'bottom';
    let length: 'height' | 'width' = 'height';

    if (axis === 'horizontal') {
        start = 'left';
        end = 'right';
        length = 'width';
    }

    return {
        [start]: {
            [start]: (anchor: HTMLElement, p: HTMLElement) =>
                p.getBoundingClientRect()[start] === anchor.getBoundingClientRect()[start],
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                return p.getBoundingClientRect()[start] === anchorRect[start] + (anchorRect[length] / 2); },
            [end]: (anchor: HTMLElement, p: HTMLElement) =>
                p.getBoundingClientRect()[start] === anchor.getBoundingClientRect()[end]
        },
        center: {
            [start]: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                return popupRect[start] === anchor.getBoundingClientRect()[start] - (popupRect[length] / 2); },
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                const anchorRect = anchor.getBoundingClientRect();
                return popupRect[start] ===  anchorRect[start] + (anchorRect[length] / 2) - (popupRect[length] / 2);
            },
            [end]: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                return popupRect[end] === anchor.getBoundingClientRect()[end] + (popupRect[length] / 2); }
        },
        [end]: {
            [start]: (anchor: HTMLElement, p: HTMLElement) =>
                p.getBoundingClientRect()[end] === anchor.getBoundingClientRect()[start],
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                return p.getBoundingClientRect()[end] === anchorRect[start] + (anchorRect[length] / 2); },
            [end]: (anchor: HTMLElement, p: HTMLElement) =>
                p.getBoundingClientRect()[end] === anchor.getBoundingClientRect()[end]
        }
    };
}
