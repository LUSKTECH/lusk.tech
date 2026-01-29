import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About', () => {
    it('renders section heading', () => {
        render(<About />);
        expect(screen.getByText(/Who is/i)).toBeInTheDocument();
        expect(screen.getByText(/Lusk Technologies/i)).toBeInTheDocument();
    });

    it('renders profile image', () => {
        render(<About />);
        const image = screen.getByAltText('Cody Lusk - Founder of Lusk Technologies');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/profile/profile-round-transparent.png');
    });

    it('renders company description', () => {
        render(<About />);
        expect(screen.getByText(/boutique consultancy/i)).toBeInTheDocument();
    });

    it('renders founder information', () => {
        render(<About />);
        const founderHeading = screen.getByRole('heading', { name: /Cody Lusk/i });
        expect(founderHeading).toBeInTheDocument();
    });

    it('has proper section id for navigation', () => {
        const { container } = render(<About />);
        const section = container.querySelector('#about');
        expect(section).toBeInTheDocument();
    });

    it('renders all content paragraphs', () => {
        const { container } = render(<About />);
        const paragraphs = container.querySelectorAll('p');
        expect(paragraphs.length).toBeGreaterThan(0);
    });
});
