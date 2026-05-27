import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';
import userEvent from '@testing-library/user-event';

describe('Button primitive', () => {
  it('renders children and responds to click', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
