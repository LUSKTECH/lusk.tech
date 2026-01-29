import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link to="/" className="back-link">← Back to Home</Link>
                    
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last Updated: January 27, 2026</p>

                    <section>
                        <h2>1. Information We Collect</h2>
                        <p>
                            When you contact us through our website, we collect the following information:
                        </p>
                        <ul>
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Phone number (optional)</li>
                            <li>Company name (optional)</li>
                            <li>Message content</li>
                        </ul>
                    </section>

                    <section>
                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information you provide to:</p>
                        <ul>
                            <li>Respond to your inquiries and requests</li>
                            <li>Provide information about our services</li>
                            <li>Communicate with you about potential projects</li>
                            <li>Maintain records for business purposes</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Data Storage and Security</h2>
                        <p>
                            Your contact information is stored securely in our database and is only accessible 
                            to authorized personnel. We implement appropriate technical and organizational measures 
                            to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section>
                        <h2>4. Data Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. 
                            We may share your information only in the following circumstances:
                        </p>
                        <ul>
                            <li>With your explicit consent</li>
                            <li>To comply with legal obligations</li>
                            <li>To protect our rights and property</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Email Communications</h2>
                        <p>
                            When you submit a contact form, we use Postmark to send email notifications. 
                            Postmark's privacy policy applies to the transmission of these emails.
                        </p>
                    </section>

                    <section>
                        <h2>6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access the personal data we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                        <p>
                            To exercise these rights, please contact us at{' '}
                            <a href="mailto:privacy@lusk.tech">privacy@lusk.tech</a>
                        </p>
                    </section>

                    <section>
                        <h2>7. Cookies and Tracking</h2>
                        <p>
                            Our website does not use cookies or tracking technologies at this time.
                        </p>
                    </section>

                    <section>
                        <h2>8. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any 
                            changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                        </p>
                    </section>

                    <section>
                        <h2>9. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p>
                            Email: <a href="mailto:privacy@lusk.tech">privacy@lusk.tech</a><br />
                            Phone: <a href="tel:+18665875832">+1-866-LUSKTECH</a>
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
