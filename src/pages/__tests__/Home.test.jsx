import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

const renderHome = () => {
    return render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
};

describe('Home', () => {
    it('renders Hero section', () => {
        renderHome();
        expect(screen.getByText(/Cloud-Native/i)).toBeInTheDocument();
    });

    it('renders Services section', () => {
        renderHome();
        expect(screen.getByText('How We Help')).toBeInTheDocument();
    });

    it('renders Portfolio section', () => {
        renderHome();
        expect(screen.getByText('Featured Work')).toBeInTheDocument();
    });

    it('renders About section', () => {
        renderHome();
        expect(screen.getByText(/Who is/i)).toBeInTheDocument();
    });

    it('has all main sections', () => {
        const { container } = renderHome();
        expect(container.querySelector('#services')).toBeInTheDocument();
        expect(container.querySelector('#portfolio')).toBeInTheDocument();
        expect(container.querySelector('#about')).toBeInTheDocument();
    });
});
