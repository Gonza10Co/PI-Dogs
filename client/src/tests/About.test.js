import { render, screen } from '@testing-library/react';
import About from '../views/about'

test('renders learn react link', () => {
  render(<About />);
  const linkElement = screen.getByText(/About me/i);
  expect(linkElement).toBeInTheDocument();
});

test('back button', () => {
  render(<About />);
  const linkElement = screen.getByText('back').closest('a');
  expect(linkElement).toHaveAttribute('href','/dogs')
});
