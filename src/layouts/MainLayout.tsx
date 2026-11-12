import { Link, NavLink, Outlet } from 'react-router'

function MainLayout() {
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
