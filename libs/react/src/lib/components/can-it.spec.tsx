import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CanItProvider } from '../contexts/can-it';
import { CanIt } from './can-it';

describe('< CanIt />', () => {
  function SampleComponent() {
    return (<>
      <div data-testid="allow">
        <CanIt allowTo={['view', 'docs']}>allow</CanIt>
      </div>
      <div data-testid="else">
        <CanIt allowTo={['click', 'docs']} else={<>not-authorized</>}>
          <div data-testid="else-authorized">authorized</div>
        </CanIt>
      </div>
    </>);
  }
  beforeEach(() => {
    render(<CanItProvider policy={{ allow: [['view', 'docs']]}}><SampleComponent></SampleComponent></CanItProvider>);
  });

  it('should show children if allowing', () => {
    expect(screen.getByTestId('allow')).toBeTruthy();
  });

  it('should show the else if not allow', () => {
    expect(screen.getByTestId('else')).toHaveTextContent('not-authorized');
    expect(screen.queryByTestId('else-authorized')).toBeNull();
  });
});
