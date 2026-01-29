import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactModal from '../ContactModal';

// Mock fetch
globalThis.fetch = vi.fn();

describe('ContactModal', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('does not render when closed', () => {
        render(<ContactModal isOpen={false} onClose={() => {}} />);
        expect(screen.queryByText(/Get in Touch/i)).not.toBeInTheDocument();
    });

    it('renders when open', () => {
        render(<ContactModal isOpen={true} onClose={() => {}} />);
        expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
    });

    it('renders all form fields', () => {
        render(<ContactModal isOpen={true} onClose={() => {}} />);
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it('renders submit button', () => {
        render(<ContactModal isOpen={true} onClose={() => {}} />);
        expect(screen.getByText(/Send Message/i)).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(<ContactModal isOpen={true} onClose={onClose} />);
        
        const closeButton = screen.getByLabelText(/Close/i);
        fireEvent.click(closeButton);
        
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('validates required fields', async () => {
        render(<ContactModal isOpen={true} onClose={() => {}} />);
        
        const submitButton = screen.getByText(/Send Message/i);
        fireEvent.click(submitButton);
        
        // Form should not submit without required fields
        expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('submits form with valid data', async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true })
        });

        render(<ContactModal isOpen={true} onClose={() => {}} />);
        
        fireEvent.change(screen.getByLabelText(/Name/i), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/Phone/i), {
            target: { value: '555-1234' }
        });
        fireEvent.change(screen.getByLabelText(/Message/i), {
            target: { value: 'Test message' }
        });
        
        const submitButton = screen.getByText(/Send Message/i);
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(globalThis.fetch).toHaveBeenCalledWith(
                '/api/contact',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })
            );
        });
    });

    it('displays success message after submission', async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true })
        });

        render(<ContactModal isOpen={true} onClose={() => {}} />);
        
        fireEvent.change(screen.getByLabelText(/Name/i), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/Phone/i), {
            target: { value: '555-1234' }
        });
        fireEvent.change(screen.getByLabelText(/Message/i), {
            target: { value: 'Test message' }
        });
        
        const submitButton = screen.getByText(/Send Message/i);
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument();
        });
    });

    it('displays error message on submission failure', async () => {
        globalThis.fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<ContactModal isOpen={true} onClose={() => {}} />);
        
        fireEvent.change(screen.getByLabelText(/Name/i), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/Phone/i), {
            target: { value: '555-1234' }
        });
        fireEvent.change(screen.getByLabelText(/Message/i), {
            target: { value: 'Test message' }
        });
        
        const submitButton = screen.getByText(/Send Message/i);
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });

    it('displays server error message on non-ok response', async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Server validation failed' })
        });

        render(<ContactModal isOpen={true} onClose={() => {}} />);
        
        fireEvent.change(screen.getByLabelText(/Name/i), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByLabelText(/Phone/i), {
            target: { value: '555-1234' }
        });
        fireEvent.change(screen.getByLabelText(/Message/i), {
            target: { value: 'Test message' }
        });
        
        const submitButton = screen.getByText(/Send Message/i);
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText(/Server validation failed/i)).toBeInTheDocument();
        });
    });
});
