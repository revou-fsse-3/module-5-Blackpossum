import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render and contain children property', async () => {
    const ChildrenText = 'Click Me';
    const className = 'style';
    render(<Button className={className}>{ChildrenText}</Button>);

    const ButtonElement = screen.getByText(ChildrenText);
    expect(ButtonElement).not.toBeNull();
    expect(ButtonElement?.classList.contains(className)).toBe(true);
    
    const ButtonClass = ButtonElement?.getAttribute('class');
    expect(ButtonClass).toContain(className);
  });
});
