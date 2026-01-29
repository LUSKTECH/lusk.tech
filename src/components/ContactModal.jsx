import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We\'ll be in touch soon.' });
                // Only clear form on successful submission
                setFormData({ name: '', email: '', phone: '', company: '', message: '' });
                setTimeout(() => onClose(), 2000);
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error. Please try again later.' });
            console.error('Contact form error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                    <button className="modal-close" onClick={onClose} aria-label="Close modal">
                        ✕
                    </button>
                        
                        <h2 style={{ marginBottom: '1rem' }}>Get in Touch</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Fill out the form below and we'll get back to you shortly.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="company">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {status.message && (
                                <div className={`status-message ${status.type}`}>
                                    {status.message}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={isSubmitting}
                                style={{ width: '100%', marginTop: '1rem' }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>

                    <style>{`
                        .modal-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.8);
                            backdrop-filter: blur(5px);
                            z-index: 9998;
                            overflow-y: auto;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 2rem;
                        }

                        .modal-content {
                            position: relative;
                            background: var(--bg-dark);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: var(--radius);
                            padding: 3rem;
                            max-width: 600px;
                            width: 90%;
                            max-height: 85vh;
                            overflow-y: auto;
                            z-index: 9999;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                        }

                        .modal-close {
                            position: absolute;
                            top: 1rem;
                            right: 1rem;
                            background: rgba(5, 10, 20, 0.95);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                            color: var(--text-muted);
                            font-size: 1.5rem;
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            transition: all 0.3s;
                            z-index: 10;
                        }

                        .modal-close:hover {
                            background: rgba(255, 255, 255, 0.1);
                            color: var(--text-main);
                        }

                        .form-row {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 1rem;
                        }

                        .form-group {
                            margin-bottom: 1.5rem;
                        }

                        .form-group label {
                            display: block;
                            margin-bottom: 0.5rem;
                            color: var(--text-main);
                            font-weight: 500;
                            font-size: 0.95rem;
                        }

                        .form-group input,
                        .form-group textarea {
                            width: 100%;
                            padding: 0.875rem;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                            border-radius: 8px;
                            color: var(--text-main);
                            font-family: var(--font-body);
                            font-size: 1rem;
                            transition: all 0.3s;
                        }

                        .form-group input:focus,
                        .form-group textarea:focus {
                            outline: none;
                            border-color: var(--primary);
                            background: rgba(255, 255, 255, 0.08);
                        }

                        .form-group textarea {
                            resize: vertical;
                            min-height: 120px;
                        }

                        .status-message {
                            padding: 1rem;
                            border-radius: 8px;
                            margin-top: 1rem;
                            font-size: 0.95rem;
                        }

                        .status-message.success {
                            background: rgba(0, 242, 255, 0.1);
                            border: 1px solid var(--primary);
                            color: var(--primary);
                        }

                        .status-message.error {
                            background: rgba(255, 0, 85, 0.1);
                            border: 1px solid #ff0055;
                            color: #ff0055;
                        }

                        @media (max-width: 600px) {
                            .modal-overlay {
                                padding: 1rem;
                            }

                            .modal-content {
                                padding: 1.5rem;
                                width: 100%;
                                max-width: 100%;
                                max-height: 90vh;
                                border-radius: 12px;
                            }

                            .modal-content h2 {
                                font-size: 1.5rem;
                                margin-bottom: 0.75rem;
                                padding-right: 2.5rem;
                            }

                            .modal-content p {
                                font-size: 0.95rem;
                                margin-bottom: 1.5rem;
                            }

                            .modal-close {
                                width: 36px;
                                height: 36px;
                                font-size: 1.25rem;
                                top: 0.75rem;
                                right: 0.75rem;
                            }

                            .form-row {
                                grid-template-columns: 1fr;
                            }

                            .form-group {
                                margin-bottom: 1.25rem;
                            }

                            .form-group label {
                                font-size: 0.9rem;
                            }

                            .form-group input,
                            .form-group textarea {
                                padding: 0.75rem;
                                font-size: 16px; /* Prevents zoom on iOS */
                            }

                            .form-group textarea {
                                min-height: 100px;
                            }

                            .status-message {
                                font-size: 0.9rem;
                                padding: 0.875rem;
                            }

                            button[type="submit"] {
                                padding: 14px 28px;
                                font-size: 1rem;
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

ContactModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ContactModal;
