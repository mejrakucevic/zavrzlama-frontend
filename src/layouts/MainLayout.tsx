import { Link, NavLink, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'

function MainLayout() {
  const { user, isLoading, logout } = useAuth()

  return (
    <>
      <a href="#main-content" className="skip-link">Preskoči na sadržaj</a>
      <div className="masthead-strip">ZA RADOZNALE GLAVE I MALE SVAKODNEVNE PAUZE</div>
      <header className="site-header">
        <div className="page-container header-inner">
          <Link to="/" className="wordmark" aria-label="Zavrzlama — početna">
            <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
            zavrzlama<span className="brand-period">.</span>
          </Link>
          <nav aria-label="Glavna navigacija" className="main-nav">
            <NavLink to="/" end>
              Početna
            </NavLink>
            <NavLink to="/games">
              Igre
            </NavLink>
            <NavLink to="/rang-lista">
              Rang lista
            </NavLink>

            {/* Dok proveravamo prijavu ne prikazujemo ništa, da dugmad ne "trepnu" */}
            {!isLoading && (user ? (
              <span className="nav-user">
                <span className="nav-username">@{user.username}</span>
                <button type="button" className="nav-button" onClick={() => void logout()}>
                  Odjava
                </button>
              </span>
            ) : (
              <>
                <NavLink to="/prijava">Prijava</NavLink>
                <NavLink to="/registracija" className="nav-cta">Registracija</NavLink>
              </>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" className="page-container main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="page-container footer-inner">
          <p className="footer-wordmark">zavrzlama.</p>
          <p>Mala pauza. Dobra zavrzlama.</p>
          <Link to="/games" className="text-link">Istraži igre <span aria-hidden="true">↗</span></Link>
        </div>
      </footer>
    </>
  )
}

export default MainLayout
