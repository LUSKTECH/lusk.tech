import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-logo-section">
                    <Link to="/" className="footer-logo">
                        <img 
                            src="/logos/logo-full-white.svg" 
                            alt="Lusk Technologies" 
                            width="300"
                            height="128"
                            style={{ height: '8rem', width: 'auto', marginBottom: '1.5rem' }}
                        />
                    </Link>
                    <p style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: '1.7' }}>
                        Boutique cloud consultancy delivering enterprise-level solutions with personalized attention.
                    </p>
                </div>
                <div className="footer-content">
                    <p style={{ fontSize: '1rem' }}>&copy; {new Date().getFullYear()} Lusk Technologies, Inc. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
