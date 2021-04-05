import { render } from '@testing-library/react';
import App from './App';

test('App contains Reader component', () => {
  const utils = render(<App />);
  expect(utils.queryByTestId(/csv-input/i)).toBeTruthy();
});