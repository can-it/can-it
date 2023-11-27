import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CanItProvider } from '../contexts/can-it';
import { useCanIt } from './use-can-it';
import { PolicyState, Request } from '@can-it/types';

describe('< CanIt />', () => {
  function SampleComponent(props: { allowTo: Request }) {
    const isAllowed = useCanIt(...props.allowTo);

    return <p data-testid="content">{String(isAllowed)}</p>;
  }

  const customRender = (request: Request, policy?: PolicyState) => render(
    <CanItProvider policy={policy}>
      <SampleComponent allowTo={request}></SampleComponent>
    </CanItProvider>
  );

  it('should show "true" element if allowing', () => {
    customRender(['view', 'docs'], { allow: [['view', 'docs']]});
    expect(screen.getByTestId('content')).toHaveTextContent('true');
  });

  it('should show "false" element else if not allow', () => {
    customRender(['edit', 'docs'], { allow: []});
    expect(screen.getByTestId('content')).toHaveTextContent('false');
  });

  it('should show "undefined" if policy is not provided', () => {
    customRender(['edit', 'docs']);
    expect(screen.getByTestId('content')).toHaveTextContent('undefined');
  });
});
