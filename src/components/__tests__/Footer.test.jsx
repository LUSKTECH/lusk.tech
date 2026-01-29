import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

const renderFooter = () => {
    return render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );
};

describe('Footer', () => {
    it('renders the logo', () => {
        renderFooter();
        const logo = screen.getByAltText('Lusk Technologies');
        expect(logo).toBeInTheDocument();
    });

    it('displays copyright with current year', () => {
        renderFooter();
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('displays company description', () => {
        renderFooter();
        expect(screen.getByText(/Boutique cloud consultancy/i)).toBeInTheDocument();
    });

    it('renders Privacy Policy link', () => {
        renderFooter();
        const privacyLink = screen.getByText('Privacy Policy');
        expect(privacyLink).toBeInTheDocument();
        expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
    });

    it('renders Terms of Service link', () => {
        renderFooter();
        const termsLink = screen.getByText('Terms of Service');
        expect(termsLink).toBeInTheDocument();
        expect(termsLink).toHaveAttribute('href', '/terms-of-service');
    });

    it('has proper footer structure', () => {
        renderFooter();
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });
});
