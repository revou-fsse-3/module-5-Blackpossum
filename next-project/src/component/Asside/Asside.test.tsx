// __tests__/Asside.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Asside from './Asside'; // Adjust the import path accordingly

interface NextLinkProps{
    children: React.ReactNode,
}


vi.fn(() => ({ children }: NextLinkProps) => children);

describe('Asside component', () => {
it('renders the component', () => {
    render(<Asside />);
    // You can use queries to check if specific elements are rendered
    expect(screen.getByText('News App')).toBeInTheDocument();
    expect(screen.getByText('World Wide News')).toBeInTheDocument();
    expect(screen.getByText('CNN News')).toBeInTheDocument();
    expect(screen.getByText('Top Headline')).toBeInTheDocument();
});

  // Add more test cases as needed
});
