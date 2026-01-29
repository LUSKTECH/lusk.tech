import { motion } from 'framer-motion';

const projects = [
    {
        title: 'Rookie Hockey',
        link: 'https://rookiehockey.ca/',
        image: '/portfolio/portfolio-rookiehockey.png'
    },
    {
        title: 'Locotek',
        link: 'https://locotek.ca/',
        image: '/portfolio/portfolio-locotek.png'
    },
    {
        title: 'Lusk App',
        link: 'https://lusk.app/',
        image: '/portfolio/portfolio-lusk-app.png'
    },
    {
        title: 'A Cut Above Lawn Care',
        link: 'https://acutabovelawncareinc.com/',
        image: '/portfolio/portfolio-acutabove.png'
    }
];

const Portfolio = () => {
    return (
        <section id="portfolio" className="portfolio-section" style={{ padding: '100px 0' }}>
            <div className="container">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Featured Work
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        style={{ margin: '0 auto' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        A selection of our recent projects.
                    </motion.p>
                </div>

                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <motion.a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            className="portfolio-item"
                            style={{
                                '--bg-image': `url(${project.image})`
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="portfolio-content">
                                <h3>{project.title}</h3>
                                <span className="link-arrow">↗</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
