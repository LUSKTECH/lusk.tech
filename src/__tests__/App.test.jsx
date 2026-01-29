import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// App already includes BrowserRouter, so we don't wrap it again
const renderApp = () => {
    return render(<App />);
};

describe('App', () => {
    it('renders without crashing', () => {
        renderApp();
        expect(document.body).toBeInTheDocument();
    });

    it('renders Header component', () => {
        renderApp();
        // Footer has logo with alt text, Header logo has empty alt
        const logo = screen.getByAltText('Lusk Technologies');
        expect(logo).toBeInTheDocument();
    });

    it('renders Footer component', () => {
        renderApp();
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('renders main content area', () => {
        renderApp();
        expect(screen.getByText(/Cloud-Native/i)).toBeInTheDocument();
    });

    it('has proper app structure', () => {
        const { container } = renderApp();
        expect(container.querySelector('.blob-cont')).toBeInTheDocument();
    });
});
