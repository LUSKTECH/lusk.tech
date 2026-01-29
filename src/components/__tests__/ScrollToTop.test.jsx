import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import { useEffect } from 'react';

// Mock window.scrollTo
const scrollToMock = vi.fn();
window.scrollTo = scrollToMock;

const TestComponent = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Trigger navigation after mount
        const timer = setTimeout(() => {
            navigate('/test');
        }, 100);
        return () => clearTimeout(timer);
    }, [navigate]);
    
    return <div>Test</div>;
};

describe('ScrollToTop', () => {
    beforeEach(() => {
        scrollToMock.mockClear();
    });

    it('scrolls to top on mount', () => {
        render(
            <BrowserRouter>
                <ScrollToTop />
            </BrowserRouter>
        );
        
        expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });

    it('scrolls to top on route change', async () => {
        render(
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<TestComponent />} />
                    <Route path="/test" element={<div>Test Page</div>} />
                </Routes>
            </BrowserRouter>
        );
        
        // Wait for navigation
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Should be called at least twice (initial + navigation)
        expect(scrollToMock.mock.calls.length).toBeGreaterThanOrEqual(2);
    });

    it('renders nothing', () => {
        const { container } = render(
            <BrowserRouter>
                <ScrollToTop />
            </BrowserRouter>
        );
        
        expect(container.firstChild).toBeNull();
    });
});
