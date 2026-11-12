import { Link } from 'react-router'
import BackendStatus from '../components/BackendStatus'
import PuzzleIllustration from '../components/PuzzleIllustration'

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Malo mozganja.<br /><em>Mnogo zabave.</em></h1>
          <p className="hero-description">Reči, veze i mali „aha!“ trenuci. Mesto za igre koje razmrdaju vijuge i ulepšaju dan.</p>
          <Link to="/games" className="retro-button">Istraži igre <span aria-hidden="true">↗</span></Link>
        </div>
        <PuzzleIllustration />
      </section>
      <BackendStatus />
    </div>
  )
}

export default HomePage
