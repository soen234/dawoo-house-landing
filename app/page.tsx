import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Nearby from '@/components/Nearby';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Contact />
        <Nearby />
      </main>
      <Footer />
    </div>
  );
}
