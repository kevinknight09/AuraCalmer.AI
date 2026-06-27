import { render, screen, fireEvent } from '@testing-library/react';
import JournalPage from './page';
import { vi, describe, it, expect } from 'vitest';

// Mock framer-motion to avoid complex animation rendering in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ error: null })
    })),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: '123' } } })
    }
  }
}));

vi.mock('@/components/AuthProvider', () => ({
  useAuth: () => ({ user: { id: '123' }, isLoading: false })
}));

describe('JournalPage Component', () => {
  it('renders the mood selector and journal textarea with accessibility labels', () => {
    render(<JournalPage />);
    
    // Check mood buttons
    expect(screen.getByRole('group', { name: 'Mood selector' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select mood Great' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select mood Okay' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select mood Stressed' })).toBeInTheDocument();

    // Check textarea
    expect(screen.getByRole('textbox', { name: 'Journal Entry' })).toBeInTheDocument();
  });

  it('allows selecting a mood and updating aria-pressed state', () => {
    render(<JournalPage />);
    
    const greatButton = screen.getByRole('button', { name: 'Select mood Great' });
    expect(greatButton).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(greatButton);
    expect(greatButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('allows user to type in the journal entry', () => {
    render(<JournalPage />);
    
    const textarea = screen.getByRole('textbox', { name: 'Journal Entry' });
    fireEvent.change(textarea, { target: { value: 'I feel a bit overwhelmed with exams.' } });
    
    expect(textarea).toHaveValue('I feel a bit overwhelmed with exams.');
  });
});
