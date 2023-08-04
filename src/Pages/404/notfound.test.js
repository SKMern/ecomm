import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For extended DOM matchers
import NotFoundPage from './index';

describe('NotFoundPage', () => {
  it('renders the component without any errors', () => {
    const { container } = render(<NotFoundPage />);
    const imageElement = container.querySelector('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000');
    expect(imageElement).toHaveAttribute('alt', '404');
    expect(imageElement).toHaveStyle(`
      marginTop: 40px;
      borderRadius: 10px;
      minHeight: 250px;
      maxHeight: 500px;
    `);
  });
});
