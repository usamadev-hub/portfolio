import { useCursor } from './hooks/useCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import PersonalProjects from './components/PersonalProjects';
import Education from './components/Education';
import Languages from './components/Languages';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { dotRef, ringRef } = useCursor();

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <PersonalProjects />
        <Education />
        <Languages />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
