import { motion } from 'framer-motion';

const services = [
    {
        icon: '🎨',
        title: 'Design',
        desc: "Designing your own website can be tough. You have the vision. We have the tools. We'll work with you to get that vision web-ready."
    },
    {
        icon: '💻',
        title: 'Development',
        desc: "We don't just design the website. We make it. 15+ years of experience in web technologies means your site will look good and run perfectly."
    },
    {
        icon: '🚀',
        title: 'Marketing',
        desc: "A company can only thrive when it has customers. Online marketing is the gateway to millions. We can help you reach them."
    },
    {
        icon: '📱',
        title: 'Social Media',
        desc: "Connect with your customers effectively. We manage multiple platforms to ensure you reach all your customers, current and prospect."
    },
    {
        icon: '🛒',
        title: 'eCommerce',
        desc: "Start selling your goods online. We work with multiple payment processors on your behalf, allowing you to focus on your product."
    },
    {
        icon: '🤝',
        title: 'Help & Support',
        desc: "We don't just sell you a product and disappear. We support it for the long run. We only succeed if you succeed."
    }
];

const Services = () => {
    return (
        <section id="services" className="services-section" style={{ padding: '100px 0' }}>
            <div className="container">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        How We Help
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        style={{ margin: '0 auto' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Comprehensive digital solutions for your business.
                    </motion.p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="service-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
