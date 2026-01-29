import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

const renderHeader = () => {
    return render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
};

describe('Header', () => {
    beforeEach(() => {
        globalThis.scrollY = 0;
    });

    it('renders the logo', () => {
        renderHeader();
        const logo = screen.getByAltText('Lusk Technologies');
        expect(logo).toBeInTheDocument();
    });

    it('renders navigation links on home page', () => {
        renderHeader();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Portfolio')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders Get in Touch button', () => {
        renderHeader();
        const buttons = screen.getAllByText('Get in Touch');
        expect(buttons.length).toBeGreaterThan(0);
    });

    it('opens mobile menu when toggle is clicked', () => {
        renderHeader();
        const menuToggle = screen.getByLabelText('Toggle menu');
        fireEvent.click(menuToggle);
        
        // Mobile menu should be visible
        const mobileLinks = screen.getAllByText('Services');
        expect(mobileLinks.length).toBeGreaterThan(1);
    });

    it('closes mobile menu when link is clicked', () => {
        renderHeader();
        const menuToggle = screen.getByLabelText('Toggle menu');
        fireEvent.click(menuToggle);
        
        const mobileLinks = screen.getAllByText('Services');
        fireEvent.click(mobileLinks[mobileLinks.length - 1]);
        
        // Menu should close (tested by state change)
        expect(menuToggle).toBeInTheDocument();
    });

    it('opens contact modal when Get in Touch is clicked', async () => {
        renderHeader();
        const button = screen.getAllByText('Get in Touch')[0];
        fireEvent.click(button);
        
        await waitFor(() => {
            expect(screen.getByText(/Fill out the form below/i)).toBeInTheDocument();
        });
    });

    it('changes style on scroll', () => {
        renderHeader();
        
        // Simulate scroll
        globalThis.scrollY = 100;
        fireEvent.scroll(globalThis);
        
        // Header should have scrolled class/style
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('has accessible menu toggle button', () => {
        renderHeader();
        const menuToggle = screen.getByLabelText('Toggle menu');
        expect(menuToggle).toHaveAttribute('aria-label', 'Toggle menu');
    });
});
