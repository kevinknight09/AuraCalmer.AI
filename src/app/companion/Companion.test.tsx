import { render, screen, fireEvent } from '@testing-library/react';
import CompanionPage from './page';
import { vi, describe, it, expect } from 'vitest';

// Mock framer-motion to avoid complex animation rendering in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('CompanionPage Component', () => {
  it('renders the chat interface with accessibility labels', () => {
    render(<CompanionPage />);
    
    // Check form and input existence
    expect(screen.getByRole('form', { name: 'Chat Form' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Chat Input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('allows user to type in the input field', () => {
    render(<CompanionPage />);
    
    const input = screen.getByRole('textbox', { name: 'Chat Input' });
    fireEvent.change(input, { target: { value: 'Hello Aura' } });
    
    expect(input).toHaveValue('Hello Aura');
    expect(screen.getByRole('button', { name: 'Send Message' })).not.toBeDisabled();
  });
});
