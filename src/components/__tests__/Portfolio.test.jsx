import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Portfolio from '../Portfolio';

describe('Portfolio', () => {
    it('renders section heading', () => {
        render(<Portfolio />);
        expect(screen.getByText('Featured Work')).toBeInTheDocument();
    });

    it('renders section subtitle', () => {
        render(<Portfolio />);
        expect(screen.getByText(/A selection of our recent projects/i)).toBeInTheDocument();
    });

    it('renders all 4 portfolio items', () => {
        render(<Portfolio />);
        expect(screen.getByText('Rookie Hockey')).toBeInTheDocument();
        expect(screen.getByText('Locotek')).toBeInTheDocument();
        expect(screen.getByText('Lusk App')).toBeInTheDocument();
        expect(screen.getByText('A Cut Above Lawn Care')).toBeInTheDocument();
    });

    it('portfolio items have correct links', () => {
        render(<Portfolio />);
        const rookieLink = screen.getByText('Rookie Hockey').closest('a');
        expect(rookieLink).toHaveAttribute('href', 'https://rookiehockey.ca/');
        expect(rookieLink).toHaveAttribute('target', '_blank');
    });

    it('renders link arrows for all items', () => {
        render(<Portfolio />);
        const arrows = screen.getAllByText('↗');
        expect(arrows).toHaveLength(4);
    });

    it('has proper section id for navigation', () => {
        const { container } = render(<Portfolio />);
        const section = container.querySelector('#portfolio');
        expect(section).toBeInTheDocument();
    });

    it('all portfolio links open in new tab', () => {
        render(<Portfolio />);
        const links = screen.getAllByRole('link');
        links.forEach(link => {
            expect(link).toHaveAttribute('target', '_blank');
        });
    });
});
