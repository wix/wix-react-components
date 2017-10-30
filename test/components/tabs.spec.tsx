import * as React from 'react';

import {codes as KeyCodes} from 'keycode';
import {ClientRenderer, expect, sinon} from 'test-drive-react';
import {ContextProvider} from '../../src/components/context-provider';
import {Tab, Tabs} from '../../src/components/tabs';
import {RTLTabsDriver, TabsDriver} from '../../test-kit';

function assertOnChange(
    onChange: sinon.SinonSpy,
    expectedValue?: string
): void {
    expect(onChange).to.have.been.calledOnce;
    expect(onChange.lastCall.args[0]).to.deep.eq({value: expectedValue});
}

describe('<Tabs />', () => {
    const clientRenderer = new ClientRenderer();
    const render = (component: React.ReactElement<any>) =>
        clientRenderer.render(component).withDriver(TabsDriver);
    const renderRTL = (component: React.ReactElement<any>) =>
        clientRenderer.render(component).withDriver(RTLTabsDriver);
    afterEach(() => clientRenderer.cleanup());

    it('should render a tabList and a tabPanel', () => {
        const {driver} = render(
            <Tabs>
                <Tab label="Tab One">Tab One Content</Tab>
                <Tab label="Tab Two">Tab Two Content</Tab>
            </Tabs>
        );

        const tabList = driver.tabList;
        const tabPanel = driver.tabPanel;

        expect(tabList).to.be.present();
        expect(tabPanel).to.be.present();
    });

    describe('defaultValue', () => {

        it('should render corresponding tab as active', async () => {
            const {select} = clientRenderer.render(
                <Tabs defaultValue="1">
                    <Tab label="Tab One">
                        <span data-automation-id="FIRST_TAB">Tab One Content</span>
                    </Tab>
                    <Tab label="Tab Two">
                        <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                    </Tab>
                </Tabs>
            );
            expect(select('FIRST_TAB')).not.to.be.present();
            expect(select('SECOND_TAB')).to.be.present();
        });

        describe('undefined', () => {
            it('should not render any tabs', async () => {
                const {driver} = render(
                    <Tabs>
                        <Tab label="Tab One">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );
                expect(driver.selectTabContent('FIRST_TAB')).not.to.be.present();
                expect(driver.selectTabContent('SECOND_TAB')).not.to.be.present();
            });
        });
    });

    describe('vertical', () => {
        describe('up key and enter', () => {
            it('should select previous tab', async () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="vertical-before" value="1" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.up);
                driver.tabListPressEnter();

                assertOnChange(onChange, '0');
            });
        });

        describe('down key and enter', () => {
            it('should select previous tab', async () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="vertical-before" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.down);
                driver.tabListPressEnter();

                assertOnChange(onChange, '1');
            });
        });
    });

    describe('horizontal', () => {
        describe('left key and enter', () => {
            it('should select previous tab', async () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="horizontal-top" value="1" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.left);
                driver.tabListPressEnter();

                assertOnChange(onChange, '0');
            });
        });

        describe('right key and enter', () => {
            it('should select next tab', async () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.right);
                driver.tabListPressEnter();

                assertOnChange(onChange, '1');
            });
        });

    });

    describe('horizontal RTL', () => {
        describe('left key and enter', () => {
            it('should select next tab', async () => {
                const onChange = sinon.spy();
                const {driver} = renderRTL(
                    <ContextProvider dir="rtl">
                        <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                        </Tabs>
                    </ContextProvider>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.left);
                driver.tabListPressEnter();

                assertOnChange(onChange, '1');
            });
        });

        describe('right key and enter', () => {
            it('should select previous tab', async () => {
                const onChange = sinon.spy();
                const {driver} = renderRTL(
                    <ContextProvider dir="rtl">
                        <Tabs orientation="horizontal-top" value="1" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                        </Tabs>
                    </ContextProvider>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.right);
                driver.tabListPressEnter();

                assertOnChange(onChange, '0');
            });
        });

    });
});