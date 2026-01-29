import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Services from '../Services';

describe('Services', () => {
    it('renders section heading', () => {
        render(<Services />);
        expect(screen.getByText('How We Help')).toBeInTheDocument();
    });

    it('renders section subtitle', () => {
        render(<Services />);
        expect(screen.getByText(/Comprehensive digital solutions/i)).toBeInTheDocument();
    });

    it('renders all 6 service cards', () => {
        render(<Services />);
        expect(screen.getByText('Design')).toBeInTheDocument();
        expect(screen.getByText('Development')).toBeInTheDocument();
        expect(screen.getByText('Marketing')).toBeInTheDocument();
        expect(screen.getByText('Social Media')).toBeInTheDocument();
        expect(screen.getByText('eCommerce')).toBeInTheDocument();
        expect(screen.getByText('Help & Support')).toBeInTheDocument();
    });

    it('renders service descriptions', () => {
        render(<Services />);
        expect(screen.getByText(/Designing your own website can be tough/i)).toBeInTheDocument();
        expect(screen.getByText(/15\+ years of experience/i)).toBeInTheDocument();
    });

    it('renders service icons', () => {
        render(<Services />);
        expect(screen.getByText('🎨')).toBeInTheDocument();
        expect(screen.getByText('💻')).toBeInTheDocument();
        expect(screen.getByText('🚀')).toBeInTheDocument();
        expect(screen.getByText('📱')).toBeInTheDocument();
        expect(screen.getByText('🛒')).toBeInTheDocument();
        expect(screen.getByText('🤝')).toBeInTheDocument();
    });

    it('has proper section id for navigation', () => {
        const { container } = render(<Services />);
        const section = container.querySelector('#services');
        expect(section).toBeInTheDocument();
    });
});
