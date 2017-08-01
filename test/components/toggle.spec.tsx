import * as React from 'react';
import {expect, ClientRenderer, sinon, simulate, waitFor} from 'test-drive-react';

import {Toggle} from '../../src';

describe('<Toggle/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without options', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange}/>)
        })
        it('should have input', () => {
            expect(renderer.select('TOGGLE_INPUT')).to.not.null
        })
    })

    describe('render with checked={true}', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange} checked/>)
        })
        it('should have input', () => {
            expect(renderer.select('TOGGLE_INPUT')).to.not.null
        })
    })

    describe('render with onChange', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange}/>)
        })

        it('pressing space on focused input should trigger onChange', () => {
            const input = renderer.select('TOGGLE_INPUT');
            simulate.focus(input)
            simulate.change(input)
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithExactly(true);
        })
    })

    describe('render with disabled={true}', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange} disabled/>)
        })
        it('should not have input underhood', () => {
            expect(renderer.select('TOGGLE_INPUT')).to.be.null;
        })

        it('click should not trigger onChange', async () => {
            simulate.click(renderer.select('TOGGLE'));
            await new Promise(resolve => setTimeout(resolve, 500));
            expect(onChange).to.not.have.been.called;
        })
    })

});
