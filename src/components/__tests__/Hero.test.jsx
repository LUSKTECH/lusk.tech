import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
    it('renders main heading with Cloud-Native text', () => {
        render(<Hero />);
        expect(screen.getByText(/Cloud-Native/i)).toBeInTheDocument();
        expect(screen.getByText(/IT Services/i)).toBeInTheDocument();
    });

    it('renders subheading', () => {
        render(<Hero />);
        expect(screen.getByText(/Modern cloud solutions/i)).toBeInTheDocument();
    });

    it('renders CTA button', () => {
        render(<Hero />);
        const button = screen.getByText(/Start a Project/i);
        expect(button).toBeInTheDocument();
    });

    it('renders Explore Services button', () => {
        render(<Hero />);
        const button = screen.getByText(/Explore Services/i);
        expect(button).toBeInTheDocument();
    });

    it('renders hero badge', () => {
        render(<Hero />);
        expect(screen.getByText(/Available for New Projects/i)).toBeInTheDocument();
    });

    it('renders stats section', () => {
        render(<Hero />);
        expect(screen.getByText(/10\+/)).toBeInTheDocument();
        expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
        expect(screen.getByText(/50\+/)).toBeInTheDocument();
        expect(screen.getByText(/Projects Delivered/i)).toBeInTheDocument();
    });

    it('has proper hero section structure', () => {
        const { container } = render(<Hero />);
        const heroSection = container.querySelector('.hero-section');
        expect(heroSection).toBeInTheDocument();
    });
});
