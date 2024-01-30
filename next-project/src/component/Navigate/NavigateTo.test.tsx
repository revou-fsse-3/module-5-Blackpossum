import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import NavigateTo from './NavigateTo';

// Helper function to wrap NavigateTo and provide a mocked href
function renderNavigateToWithMockedHref(href: string) {
  return render(<NavigateTo href={href} target="_blank" className="custom-link">Click me</NavigateTo>);
}

describe('NavigateTo component', () => {
  it('should render with mocked href', () => {
    const mockedHref = 'https://mocked-url.com';
    renderNavigateToWithMockedHref(mockedHref);

    // Access the mocked href property
    const linkElement = screen.getByText('Click me') as HTMLAnchorElement;

    // Check if the mocked href is correct using stringMatching
    expect(linkElement.href).toEqual(expect.stringMatching(mockedHref));
  });
});
