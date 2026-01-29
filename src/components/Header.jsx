import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ContactModal from './ContactModal';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'About', href: '#about' },
    ];

    const headerStyle = {
        padding: scrolled ? '1rem 0' : '1.5rem 0',
        background: scrolled ? 'rgba(5, 10, 20, 0.9)' : 'rgba(5, 10, 20, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease'
    };

    return (
        <>
        <header style={headerStyle}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img 
                        src="/logos/logomark-white.svg" 
                        alt="" 
                        style={{ height: scrolled ? '45px' : '55px', transition: 'height 0.3s ease' }}
                    />
                    <span className="logo-text" style={{ 
                        fontSize: scrolled ? '1.3rem' : '1.5rem', 
                        fontWeight: 700, 
                        fontFamily: 'var(--font-heading)', 
                        letterSpacing: '0.5px',
                        transition: 'font-size 0.3s ease'
                    }}>
                        Lusk Technologies
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'none' }}>
                    {/* We will use a media query in CSS or conditional rendering. 
            Since we have global CSS that handles .main-nav, we can re-use that class if we want,
            or inline styles. I'll use inline styles/logic for simplicity in this component.
        */}
                </nav>

                {/* Re-implementing with CSS classes from index.css for simplicity as they are already there */}
                {location.pathname === '/' && (
                    <nav className={`main-nav ${isOpen ? 'active' : ''}`}>
                        <ul style={{
                            display: 'flex',
                            listStyle: 'none',
                            alignItems: 'center',
                            gap: '2rem',
                            flexDirection: 'row'
                        }}>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-muted)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <button 
                                    onClick={() => { setIsModalOpen(true); setIsOpen(false); }} 
                                    className="btn btn-primary"
                                    style={{ border: 'none', cursor: 'pointer' }}
                                >
                                    Get in Touch
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}

                {location.pathname !== '/' && (
                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="btn btn-primary"
                        style={{ border: 'none', cursor: 'pointer' }}
                    >
                        Get in Touch
                    </button>
                )}

                {/* Mobile Toggle */}
                {location.pathname === '/' && (
                    <button
                        className="menu-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={isOpen ? 'open' : ''}></span>
                        <span className={isOpen ? 'open' : ''}></span>
                        <span className={isOpen ? 'open' : ''}></span>
                    </button>
                )}
            </div>

            {/* Mobile Menu Overlay for React (if not using CSS only) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            background: 'var(--bg-dark)',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            zIndex: 999
                        }}
                        className="mobile-menu-custom" // helper class just in case
                    >
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {link.name}
                            </a>
                        ))}
                        <button 
                            onClick={() => { setIsModalOpen(true); setIsOpen(false); }} 
                            className="btn btn-primary"
                            style={{ border: 'none', cursor: 'pointer' }}
                        >
                            Get in Touch
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
        @media (max-width: 768px) {
            .main-nav ul { display: none !important; }
            .logo-text { display: none !important; }
        }
        @media (min-width: 769px) {
            .mobile-menu-custom { display: none !important; }
        }
      `}</style>
        </header>
        
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;
