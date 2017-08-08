import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { Slider } from '../../src/components/slider';

function simulateMouseEvent(element: Element, eventType: string, options?: Object) {
  element.dispatchEvent(new MouseEvent(
    eventType,
    options as any as EventInit
  ));
}

describe.only('<Slider />', () => {
  const clientRenderer = new ClientRenderer();

  afterEach(() => clientRenderer.cleanup())

  describe('without any arguments', () => {
    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;

    beforeEach(() => {
      const rendered = clientRenderer.render(<Slider />);
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('renders ok', async () => {
      await waitForDom(() => {
        const element = select('SLIDER');

        expect(element).to.be.present();
      });
    });

    it('renders default value on the middle of the track', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-HANDLE');

        expect(element!.style.left).to.equal('50%');
      });
    });

    it('renders progress bar', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-PROGRESS');

        expect(element).to.be.present();        
        expect(element!.style.width).to.equal('50%');
      });
    });

    it('renders invisible native input with default value', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-NATIVE-INPUT');

        expect(element).to.be.present();
        expect(element).to.has.value('50');
      });
    });
  });

  describe('with value, min and max', () => {
    const value = 5;
    const min = -10;
    const max = 10;

    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;

    beforeEach(() => {
      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
        />
      );
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('renders ok', async () => {
      await waitForDom(() => {
        const element = select('SLIDER');

        expect(element).to.be.present();        
      });
    });

    it('renders handle on the right place', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-HANDLE');

        expect(element!.style.left).to.equal('75%');
      });
    });

    it('renders progress bar with the right width', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-PROGRESS');

        expect(element).to.be.present();        
        expect(element!.style.width).to.equal('75%');
      });
    });

    it('renders invisible native input with right value', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-NATIVE-INPUT');

        expect(element).to.be.present();
        expect(element).to.has.value(String(value));
      });
    });
  });

  describe('when drag things around', () => {
    const value = 5;
    const min = 0;
    const max = 10;

    let onChange: (value: number) => void;
    let onInput: (value: string) => void;
    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;
    let environment: Element;

    beforeEach(() => {
      environment = document.createElement("body");
      onChange = sinon.spy();
      onInput = sinon.spy();
      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          onInput={onInput}
          environment={environment}
        />
      );
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('should change value', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientY: bounds.top + bounds.height / 3,
          clientX: Math.round(bounds.left + bounds.width * 0.7)
        });

        expect(handle!.style.left).to.equal('70%');
        expect(progress!.style.width).to.equal('70%');
      });
    });

    it('should call onChange', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientX: Math.round(bounds.left + bounds.width * 0.5)
        });
        simulateMouseEvent(
          environment,
          'mouseup',
          {clientX: Math.round(bounds.left + bounds.width * 0.7)}
        );

        expect(onChange).to.be.calledWith(7);
      });
    });

    it('should call onInput', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientX: Math.round(bounds.left + bounds.width * 0.5)
        });
        simulateMouseEvent(
          environment,
          'mousemove',
          {clientX: Math.round(bounds.left + bounds.width * 0.6)}
        );
        simulateMouseEvent(
          environment,
          'mouseup',
          { clientX: Math.round(bounds.left + bounds.width * 0.7) }
        );

        expect(onInput).to.be.calledWith('6');
        expect(onChange).to.be.calledWith(7);
      });
    });
  });

  describe('dragging with step', () => {
    const value = 5;
    const min = 0;
    const max = 10;
    const step = 1;
    let onChange: (value: number) => void;
    let onInput: (value: string) => void;
    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;
    let environment: Element;

    beforeEach(() => {
      environment = document.createElement("body");
      onChange = sinon.spy();
      onInput = sinon.spy();

      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          onInput={onInput}
          environment={environment}
        />
      );

      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('renders ok', async () => {
      await waitForDom(() => {
        const element = select('SLIDER');

        expect(element).to.be.present();
      });
    });

    it('renders handle on the right place', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-HANDLE');

        expect(element!.style.left).to.equal('50%');
      });
    });

    it('renders progress bar with the right width', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-PROGRESS');

        expect(element).to.be.present();
        expect(element!.style.width).to.equal('50%');
      });
    });

    it('renders invisible native input with right value', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-NATIVE-INPUT');

        expect(element).to.be.present();
        expect(element).to.has.value(String(value));
      });
    });


    it('should change value according to step', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientY: bounds.top + bounds.height / 3,
          clientX: Math.round(bounds.left + bounds.width * 0.77)
        });

        expect(handle!.style.left).to.equal('80%');
        expect(progress!.style.width).to.equal('80%');
      });
    });

    it('should call onChange with value normilized to step', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientX: Math.round(bounds.left + bounds.width * 0.5)
        });
        simulateMouseEvent(
          environment,
          'mouseup',
          { clientX: Math.round(bounds.left + bounds.width * 0.77) }
        );

        expect(onChange).to.be.calledWith(8);
      });
    });

    it('should call onInput with value normilized to step', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientX: Math.round(bounds.left + bounds.width * 0.5)
        });
        simulateMouseEvent(
          environment,
          'mousemove',
          { clientX: Math.round(bounds.left + bounds.width * 0.56) }
        );
        simulateMouseEvent(
          environment,
          'mouseup',
          { clientX: Math.round(bounds.left + bounds.width * 0.66) }
        );

        expect(onInput).to.be.calledWith('6');
        expect(onChange).to.be.calledWith(7);
      });
    });
  });

  describe('when disabled', () => {
    const value = 5;
    const min = 1;
    const max = 10;

    let onChange: (value: number) => void;
    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;

    beforeEach(() => {
      onChange = sinon.spy();
      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          disabled={true}
        />
      );
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('should not change value', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientY: bounds.top + bounds.height/3,
          clientX: bounds.left + bounds.width/4
        });

        expect(handle!.style.left).not.to.equal('25%');
        expect(progress!.style.width).not.to.equal('25%');
      });
    });
  });


  describe('when in error state', () => {
    const value = 5;
    const min = 1;
    const max = 10;

    it('should apply Error custom state', async () => {
      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
          error={true}
        />
      );

      const select = rendered.select;
      const waitForDom = rendered.waitForDom;

      await waitForDom(() => {
        const root = select('SLIDER-CONTAINER') as HTMLElement;
        const errorAttributeName = Object.keys(root!.dataset)
          .filter(
            attribute => attribute.match(/error$/i)
          )[0];
        const errorAttributeValue = root!.dataset[errorAttributeName];

        expect(errorAttributeValue).to.equal('true');
      });
    });
  });
});
