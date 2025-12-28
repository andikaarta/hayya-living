import Hero from '@/components/Hero';
import About from '@/components/About';
import ProductList from '@/components/ProductList';
import Partners from '@/components/Partners';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <ProductList />
      <Partners />
      <Testimonials />
      <About />
      <Contact />
    </main>
  );
}
