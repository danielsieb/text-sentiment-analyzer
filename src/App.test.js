import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the fireword detector header', () => {
  render(<App />);
  const linkElement = screen.getByText(/fireword detector/i);
  expect(linkElement).toBeInTheDocument();
});
