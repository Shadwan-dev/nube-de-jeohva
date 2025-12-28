import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Lazy load de componentes
const Hero = lazy(() => import('../../components/Hero/Hero'));
const Products = lazy(() => import('../../components/Products/Products'));
const About = lazy(() => import('../../components/About/About'));
const ContactForm = lazy(() => import('../../components/ContactForm/ContactForm'));

function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <Products />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ContactForm />
      </Suspense>
    </>
  );
}

export default Home;