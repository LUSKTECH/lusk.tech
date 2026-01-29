import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <div className="legal-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link to="/" className="back-link">← Back to Home</Link>
                    
                    <h1>Terms of Service</h1>
                    <p className="last-updated">Last Updated: January 27, 2026</p>

                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Lusk Technologies website and services, you accept and agree 
                            to be bound by these Terms of Service. If you do not agree to these terms, please do not 
                            use our services.
                        </p>
                    </section>

                    <section>
                        <h2>2. Services Description</h2>
                        <p>
                            Lusk Technologies provides IT consulting and cloud services, including but not limited to:
                        </p>
                        <ul>
                            <li>Cloud infrastructure design and implementation</li>
                            <li>Web development and design</li>
                            <li>DevOps and automation services</li>
                            <li>Technical consulting</li>
                        </ul>
                        <p>
                            Specific services will be defined in individual service agreements or statements of work.
                        </p>
                    </section>

                    <section>
                        <h2>3. Client Responsibilities</h2>
                        <p>Clients agree to:</p>
                        <ul>
                            <li>Provide accurate and complete information</li>
                            <li>Respond to requests for information in a timely manner</li>
                            <li>Maintain the confidentiality of any access credentials provided</li>
                            <li>Comply with all applicable laws and regulations</li>
                            <li>Pay all fees as agreed upon in service contracts</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Payment Terms</h2>
                        <p>
                            Payment terms will be specified in individual service agreements. Unless otherwise stated:
                        </p>
                        <ul>
                            <li>Invoices are due within 30 days of receipt</li>
                            <li>Late payments may incur interest charges</li>
                            <li>Services may be suspended for non-payment</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Intellectual Property</h2>
                        <p>
                            Unless otherwise specified in a service agreement:
                        </p>
                        <ul>
                            <li>Lusk Technologies retains ownership of all pre-existing intellectual property</li>
                            <li>Custom work product created for clients will be transferred upon full payment</li>
                            <li>Clients retain ownership of their data and content</li>
                            <li>Lusk Technologies may use project work in portfolios with client permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Confidentiality</h2>
                        <p>
                            Both parties agree to maintain the confidentiality of any proprietary or sensitive 
                            information shared during the course of the business relationship. This obligation 
                            survives the termination of services.
                        </p>
                    </section>

                    <section>
                        <h2>7. Warranties and Disclaimers</h2>
                        <p>
                            Lusk Technologies will provide services in a professional and workmanlike manner. 
                            However, except as expressly stated in service agreements:
                        </p>
                        <ul>
                            <li>Services are provided "as is" without warranties of any kind</li>
                            <li>We do not guarantee uninterrupted or error-free service</li>
                            <li>We are not responsible for third-party services or platforms</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Lusk Technologies shall not be liable for:
                        </p>
                        <ul>
                            <li>Indirect, incidental, or consequential damages</li>
                            <li>Loss of profits, data, or business opportunities</li>
                            <li>Damages exceeding the fees paid for services in the preceding 12 months</li>
                        </ul>
                    </section>

                    <section>
                        <h2>9. Termination</h2>
                        <p>
                            Either party may terminate services with written notice as specified in the service agreement. 
                            Upon termination:
                        </p>
                        <ul>
                            <li>Client remains responsible for payment of services rendered</li>
                            <li>Lusk Technologies will provide reasonable assistance with transition</li>
                            <li>Confidentiality obligations remain in effect</li>
                        </ul>
                    </section>

                    <section>
                        <h2>10. Governing Law</h2>
                        <p>
                            These Terms of Service shall be governed by and construed in accordance with the laws 
                            of Ontario, Canada, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2>11. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Changes will be effective 
                            immediately upon posting to this page. Continued use of our services constitutes 
                            acceptance of modified terms.
                        </p>
                    </section>

                    <section>
                        <h2>12. Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, please contact us at:
                        </p>
                        <p>
                            Email: <a href="mailto:legal@lusk.tech">legal@lusk.tech</a><br />
                            Phone: <a href="tel:+18665875832">+1-866-LUSKTECH</a><br />
                            Address: Toronto, Ontario, Canada
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
