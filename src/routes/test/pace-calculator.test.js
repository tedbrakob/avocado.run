import { render, screen } from '@testing-library/react';
import PaceCalculator from '../pace-calculator';

test('renders time explainer', () => {
  render(<PaceCalculator />);
  const linkElement = screen.getByText(/To calculate your time, fill in your distance and pace then click here/i);
  expect(linkElement).toBeInTheDocument();
});
