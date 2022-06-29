import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TheShop', () => {
  render(<App />);
  const linkElement = screen.getByText(/TheShop/i);
  expect(linkElement).toBeInTheDocument();
});
