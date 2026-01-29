import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="container">
                <div className="hero-content">
                    {/* Animated badge */}
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="badge-dot"></span>
                        Available for New Projects
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <span className="gradient-text">Cloud-Native</span>{' '}IT Services
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Modern cloud solutions and web development for the next generation of businesses.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <a href="#contact" className="btn btn-primary">
                            Start a Project{' '}<span className="btn-arrow">→</span>
                        </a>
                        <a href="#services" className="btn btn-secondary">Explore Services</a>
                    </motion.div>

                    {/* Floating stats */}
                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <div className="stat-item">
                            <div className="stat-number">10+</div>
                            <div className="stat-label">Years Experience</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Projects Delivered</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Client Satisfaction</div>
                        </div>
                    </motion.div>
                </div>

                {/* Animated grid background */}
                <div className="hero-grid"></div>
            </div>
            <style>{`
        .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding-top: 120px;
            position: relative;
            overflow: hidden;
        }

        @media (max-width: 768px) {
            .hero-section {
                min-height: auto;
                padding: 120px 0 80px;
            }
        }
        
        .hero-content { 
            max-width: 900px;
            position: relative;
            z-index: 2;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.25rem;
            background: rgba(0, 242, 255, 0.1);
            border: 1px solid rgba(0, 242, 255, 0.3);
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--primary);
            margin-bottom: 2rem;
            backdrop-filter: blur(10px);
        }

        .badge-dot {
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
            animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }

        .hero-subtitle {
            font-size: 1.4rem;
            line-height: 1.6;
            max-width: 600px;
        }

        .hero-actions {
            margin-top: 3rem;
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }

        .btn-arrow {
            display: inline-block;
            margin-left: 0.5rem;
            transition: transform 0.3s;
        }

        .btn-primary:hover .btn-arrow {
            transform: translateX(5px);
        }

        .hero-stats {
            display: flex;
            gap: 3rem;
            margin-top: 5rem;
            padding: 2rem 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            flex-wrap: wrap;
        }

        .stat-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            font-family: var(--font-heading);
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
        }

        .stat-label {
            font-size: 0.9rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .stat-divider {
            width: 1px;
            background: rgba(255, 255, 255, 0.1);
        }

        .hero-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(0, 242, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 242, 255, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
            animation: grid-flow 20s linear infinite;
            z-index: 1;
        }

        @keyframes grid-flow {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
        }

        @media (max-width: 768px) {
            .hero-stats {
                gap: 2rem;
                margin-top: 3rem;
            }

            .stat-divider {
                display: none;
            }

            .stat-number {
                font-size: 2rem;
            }

            .hero-actions {
                flex-direction: column;
                align-items: flex-start;
            }

            .btn-secondary {
                margin-left: 0;
            }
        }
      `}</style>
        </section>
    );
};

export default Hero;
