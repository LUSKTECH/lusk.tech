import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Contact />
        </main>
    );
};

export default Home;
