import Footer from './component/Footer';
import Hero from './component/Hero';
import Features from './component/Features';
import Testimonials from './component/Testimonials';
import CallToAction from './component/CallToAction';
import HowItWorks from './component/HowItWorks';


const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;