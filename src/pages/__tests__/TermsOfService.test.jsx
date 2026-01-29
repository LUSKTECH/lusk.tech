import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TermsOfService from '../TermsOfService';

const renderTermsOfService = () => {
    return render(
        <BrowserRouter>
            <TermsOfService />
        </BrowserRouter>
    );
};

describe('TermsOfService', () => {
    it('renders page title', () => {
        renderTermsOfService();
        expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });

    it('renders effective date', () => {
        renderTermsOfService();
        expect(screen.getByText(/Last Updated/i)).toBeInTheDocument();
    });

    it('renders main sections', () => {
        renderTermsOfService();
        expect(screen.getByText(/Acceptance of Terms/i)).toBeInTheDocument();
        expect(screen.getByText(/Services Description/i)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Intellectual Property/i })).toBeInTheDocument();
    });

    it('renders contact information', () => {
        renderTermsOfService();
        expect(screen.getByText(/legal@lusk\.tech/i)).toBeInTheDocument();
    });

    it('has proper page structure', () => {
        const { container } = renderTermsOfService();
        const legalPage = container.querySelector('.legal-page');
        expect(legalPage).toBeInTheDocument();
    });
});
