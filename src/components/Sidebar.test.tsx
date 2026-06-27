import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { vi, describe, it, expect } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Sidebar Component', () => {
  it('renders navigation links correctly with aria-labels', () => {
    render(<Sidebar />);
    
    // Check main navigation region
    expect(screen.getByRole('navigation', { name: 'Main Navigation' })).toBeInTheDocument();
    
    // Check links
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Journal' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Companion' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Insights' })).toBeInTheDocument();

    // Check active state
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders the settings button', () => {
    render(<Sidebar />);
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
  });
});
