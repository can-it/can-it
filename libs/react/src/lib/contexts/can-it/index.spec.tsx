
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { PolicyResolver, CanItProvider, usePolicyStore, usePolicyState } from '.';
import { PolicyState, Request } from '@can-it/types';

describe('Context', () => {
  describe('Using Default Props', () => {
    const SET_POLICY: PolicyState = { allow: [] };
    function Consumer() {
      const { policy } = usePolicyState();
      const { set, update } = usePolicyStore();

      const increaseDeny: PolicyResolver = (pre?: PolicyState) => {
        const request: Request = ['', ''];
        if (!pre) {
          return { allow: [], deny: [request] };
        }

        return { ...pre, deny: (pre.deny || []).concat([request]) };
      };

      return (<>
        <div>{ !policy && 'policy:empty' || 'policy:presence' }</div>
        <div data-testid="allow-count">{ policy?.allow.length }</div>
        <div data-testid="deny-count">{ policy?.deny?.length }</div>
        <button data-testid="initial" onClick={() => set(SET_POLICY)}></button>
        <button data-testid="reset" onClick={() => set()}></button>
        <button data-testid="increase-deny" onClick={() => update(increaseDeny) }></button>
      </>);
    }

    beforeEach(() => {
      render(
        <CanItProvider><Consumer></Consumer></CanItProvider>
      );
    });
    it('should have no policy', () => {
      expect(screen.getByText('policy:empty')).toBeTruthy();
    });

    it('should able to set policy', () => {
      expect(screen.getByTestId('allow-count')).toHaveTextContent('');

      fireEvent.click(screen.getByTestId('initial'));
      expect(screen.getByTestId('allow-count')).toHaveTextContent('0');
    });

    it('should able to reset policy', () => {
      expect(screen.getByTestId('allow-count')).toHaveTextContent('');

      fireEvent.click(screen.getByTestId('initial'));
      expect(screen.getByTestId('allow-count')).toHaveTextContent('0');

      fireEvent.click(screen.getByTestId('reset'));
      expect(screen.getByTestId('allow-count')).toHaveTextContent('');
    });

    it('should able to update policy base on previous policy', () => {
      expect(screen.getByTestId('deny-count')).toHaveTextContent('');

      fireEvent.click(screen.getByTestId('increase-deny'));
      expect(screen.getByTestId('deny-count')).toHaveTextContent('1');

      fireEvent.click(screen.getByTestId('increase-deny'));
      expect(screen.getByTestId('deny-count')).toHaveTextContent('2');
    });
  });


  describe('Using custom props', () => {
    function Consumer() {
      const { policy } = usePolicyState();

      return (<>
        <div data-testid="allow-count">{ policy?.allow.length }</div>
        <div data-testid="deny-count">{ policy?.deny?.length }</div>
      </>);
    }

    beforeEach(() => {
      const policy: PolicyState = {
        allow: [['', '']],
        deny: [
          ['', ''],
          ['', '']
        ]
      };
      render(
        <CanItProvider policy={policy}><Consumer></Consumer></CanItProvider>
      );
    });

    it('should able to get the custom props', () => {
      expect(screen.getByTestId('allow-count')).toHaveTextContent('1');
      expect(screen.getByTestId('deny-count')).toHaveTextContent('2');
    });
  });

  describe('Using outside of CanItProvider', () => {
    function OutsideConsumer() {
      const { set } = usePolicyStore();

      set();
      return <>hello</>;
    }
    it('should throw error', () => {
      expect(() => render(<OutsideConsumer></OutsideConsumer>)).toThrow();
    });
  });
});
