import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import WorkExperience from '@/components/work-experience';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <About />
        <Projects />
        <WorkExperience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}