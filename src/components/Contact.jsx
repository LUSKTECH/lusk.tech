import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="contact-section" style={{ padding: '100px 0' }}>
            <div className="container">
                <motion.div
                    className="contact-box"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="contact-header" style={{ textAlign: 'center', margin: '0 auto' }}>
                        <h2>Start a Project</h2>
                        <p style={{ margin: '0 auto' }}>Lusk Technologies is currently accepting new client contracts. Reach out and see what we can do for you.</p>
                    </div>
                    <div className="contact-methods">
                        <div className="method">
                            <span className="method-label">Email</span>
                            <a href="mailto:sales@lusk.tech" className="method-value">sales@lusk.tech</a>
                        </div>
                        <div className="method">
                            <span className="method-label">Phone</span>
                            <a href="tel:+18665875832" className="method-value">+1-866-LUSKTECH</a>
                        </div>
                        <div className="method">
                            <span className="method-label">Location</span>
                            <span className="method-value">Toronto, Ontario, Canada</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
