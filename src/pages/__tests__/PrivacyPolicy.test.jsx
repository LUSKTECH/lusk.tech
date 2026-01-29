import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PrivacyPolicy from '../PrivacyPolicy';

const renderPrivacyPolicy = () => {
    return render(
        <BrowserRouter>
            <PrivacyPolicy />
        </BrowserRouter>
    );
};

describe('PrivacyPolicy', () => {
    it('renders page title', () => {
        renderPrivacyPolicy();
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('renders effective date', () => {
        renderPrivacyPolicy();
        const lastUpdated = screen.getByText(/Last Updated: January/i);
        expect(lastUpdated).toBeInTheDocument();
    });

    it('renders main sections', () => {
        renderPrivacyPolicy();
        expect(screen.getByText(/Information We Collect/i)).toBeInTheDocument();
        expect(screen.getByText(/How We Use Your Information/i)).toBeInTheDocument();
        expect(screen.getByText(/Data Storage and Security/i)).toBeInTheDocument();
    });

    it('renders contact information', () => {
        renderPrivacyPolicy();
        const contactLinks = screen.getAllByText(/privacy@lusk\.tech/i);
        expect(contactLinks.length).toBeGreaterThan(0);
    });

    it('has proper page structure', () => {
        const { container } = renderPrivacyPolicy();
        const legalPage = container.querySelector('.legal-page');
        expect(legalPage).toBeInTheDocument();
    });
});
