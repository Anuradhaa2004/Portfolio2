import Navbar from './components/Navbar'
import Hero from './components/Hero'
import resumeUrl from './assets/RESUME.pdf'
import About from './components/About'
import Skill from './components/Skill'
import Projects from './components/Projects'
import Achievements from './components/Achievement'
import Contact from './components/Contact'
import Footer from './components/footer'

function App() {
  return (
    <main>
      <Navbar resumeUrl={resumeUrl} />
      <Hero />
      <About />
      <Skill />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  )
}

export default App