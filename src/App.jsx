import Navbar from './components/Navbar'
import Hero from './components/Hero'
import resumeUrl from './assets/RESUME.pdf'
import About from './components/About'
import Skill from './components/Skill'
import Projects from './components/Projects'
import Achievements from './components/Achievement'

function App() {
  return (
    <main>
      <Navbar resumeUrl={resumeUrl} />
      <Hero />
      <About />
      <Skill />
      <Projects />
      <Achievements />
    </main>
  )
}

export default App