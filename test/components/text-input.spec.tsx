import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { TextInput } from '../../src';

describe('<TextInput />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup())

    it('outputs an input element with type="text" by default', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<TextInput data-automation-id="TEXT_INPUT" />);

        await waitForDom(() => {
            const textInput = select('TEXT_INPUT');

            expect(textInput).to.be.present();
            // expect(textInput).to.be.instanceOf(HTMLInputElement);
            expect(textInput).to.have.attribute('type', 'text');
        });
    });
});
