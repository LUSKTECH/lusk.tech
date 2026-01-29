import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver for tests (jsdom doesn't implement it)
beforeAll(() => {
    // Mock scrollTo (jsdom doesn't implement it)
    globalThis.scrollTo = () => { /* Mock: scroll behavior not needed in tests */ };
    
    globalThis.IntersectionObserver = class IntersectionObserver {
        // Store callback for potential use in tests that need to trigger intersection
        callback;
        
        constructor(callback) {
            this.callback = callback;
        }
        
        // IntersectionObserver.disconnect() - stops observing all targets
        // Empty implementation is intentional for mock
        disconnect() { /* Mock: no targets to stop observing */ }
        
        // IntersectionObserver.observe() - starts observing a target element
        // Empty implementation is intentional for mock
        observe() { /* Mock: element observation not needed in tests */ }
        
        // IntersectionObserver.takeRecords() - returns pending intersection entries
        takeRecords() {
            return [];
        }
        
        // IntersectionObserver.unobserve() - stops observing a specific target
        // Empty implementation is intentional for mock
        unobserve() { /* Mock: element unobservation not needed in tests */ }
    };
});

// Cleanup after each test
afterEach(() => {
    cleanup();
});
