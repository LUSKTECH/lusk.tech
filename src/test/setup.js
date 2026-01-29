import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver for tests (jsdom doesn't implement it)
beforeAll(() => {
    globalThis.IntersectionObserver = class IntersectionObserver {
        constructor(callback) {
            this.callback = callback;
        }
        disconnect() {
            // No-op: mock implementation for testing
        }
        observe() {
            // No-op: mock implementation for testing
        }
        takeRecords() {
            return [];
        }
        unobserve() {
            // No-op: mock implementation for testing
        }
    };
});

// Cleanup after each test
afterEach(() => {
    cleanup();
});
