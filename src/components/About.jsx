import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="about-section" style={{ padding: '100px 0' }}>
            <div className="container">
                <div className="about-grid">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Who is <span className="gradient-text">Lusk Technologies?</span></h2>
                        <p>
                            A boutique consultancy delivering enterprise-level cloud and web solutions with personalized attention. 
                            Founded and operated by Cody Lusk, with a curated network of specialists engaged as needed to ensure 
                            the right expertise for every project.
                        </p>
                    </motion.div>

                    <motion.div
                        className="about-visual"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="profile-container">
                            <div className="profile-glow"></div>
                            <img 
                                src="/profile/profile-round-transparent.png" 
                                alt="Cody Lusk - Founder of Lusk Technologies"
                                className="profile-image"
                                width="300"
                                height="300"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="founder-info-wrapper"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="founder-info">
                            <h3>Cody Lusk</h3>
                            <span className="role">Owner / Founder</span>
                            <div className="social-links">
                                <a href="https://github.com/lusky3" target="_blank" aria-label="Github">GH</a>
                                <a href="https://www.linkedin.com/in/cody-lusk/" target="_blank" aria-label="LinkedIn">LI</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
