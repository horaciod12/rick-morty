import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Rick and Morty title', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  render(<App />);
  const linkElement = screen.getByText("Rick and Morty");
  expect(linkElement).toBeInTheDocument();
});
