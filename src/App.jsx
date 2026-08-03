import Navbar from './components/Navbar'
import Hero from './components/Hero'
import resumeUrl from './assets/RESUME.pdf'
import About from './components/About'
import Skill from './components/Skill'
import Projects from './components/Projects'

function App() {
  return (
    <main>
      <Navbar resumeUrl={resumeUrl} />
      <Hero />
      <About />
      <Skill />
      <Projects />
    </main>
  )
}

export default App