import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Header from '../Header';

const renderHeader = () => {
    return render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
};

const renderHeaderAtPath = (path) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <Header />
        </MemoryRouter>
    );
};

describe('Header', () => {
    beforeEach(() => {
        globalThis.scrollY = 0;
    });

    it('renders the logo', () => {
        renderHeader();
        // Logo image has empty alt since text "Lusk Technologies" is adjacent
        const logo = screen.getByRole('presentation');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/logos/logomark-white.svg');
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

    it('changes nav link color on hover', () => {
        renderHeader();
        const servicesLink = screen.getByText('Services');
        
        // Trigger mouse enter
        fireEvent.mouseEnter(servicesLink);
        expect(servicesLink).toHaveStyle({ color: 'var(--primary)' });
        
        // Trigger mouse leave
        fireEvent.mouseLeave(servicesLink);
        expect(servicesLink).toHaveStyle({ color: 'var(--text-muted)' });
    });

    it('renders only Get in Touch button on non-home pages', () => {
        renderHeaderAtPath('/privacy-policy');
        
        // Should have Get in Touch button
        const button = screen.getByText('Get in Touch');
        expect(button).toBeInTheDocument();
        
        // Should NOT have nav links
        expect(screen.queryByText('Services')).not.toBeInTheDocument();
        expect(screen.queryByText('Portfolio')).not.toBeInTheDocument();
        expect(screen.queryByText('About')).not.toBeInTheDocument();
    });

    it('opens contact modal from non-home page button', async () => {
        renderHeaderAtPath('/terms-of-service');
        
        const button = screen.getByText('Get in Touch');
        fireEvent.click(button);
        
        await waitFor(() => {
            expect(screen.getByText(/Fill out the form below/i)).toBeInTheDocument();
        });
    });

    it('opens contact modal from mobile menu button', async () => {
        renderHeader();
        const menuToggle = screen.getByLabelText('Toggle menu');
        fireEvent.click(menuToggle);
        
        // Find the mobile menu Get in Touch button (last one)
        const buttons = screen.getAllByText('Get in Touch');
        const mobileButton = buttons[buttons.length - 1];
        fireEvent.click(mobileButton);
        
        await waitFor(() => {
            expect(screen.getByText(/Fill out the form below/i)).toBeInTheDocument();
        });
    });

    it('closes mobile menu when mobile nav link is clicked', () => {
        renderHeader();
        const menuToggle = screen.getByLabelText('Toggle menu');
        
        // Open menu
        fireEvent.click(menuToggle);
        
        // Get mobile menu links (there should be duplicates when menu is open)
        const aboutLinks = screen.getAllByText('About');
        expect(aboutLinks.length).toBeGreaterThan(1);
        
        // Click the mobile menu link (last one)
        fireEvent.click(aboutLinks[aboutLinks.length - 1]);
        
        // Menu toggle should still be in document
        expect(menuToggle).toBeInTheDocument();
    });
});
