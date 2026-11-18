import { Link, useLocation } from 'react-router'

// Poruka za neprijavljene korisnike na stranicama igara
function LoginPrompt() {
  const location = useLocation()

  return (
    <div className="login-prompt">
      <p>Igre su takmičarske: rezultat svake partije ide na rang listu. Za igranje je potreban nalog.</p>
      <div className="login-prompt-actions">
        {/* state.from: posle prijave vrati korisnika baš na ovu igru */}
        <Link to="/prijava" state={{ from: location.pathname }} className="retro-button">
          Prijavi se <span aria-hidden="true">↗</span>
        </Link>
        <Link to="/registracija" className="text-link">Napravi nalog</Link>
      </div>
    </div>
  )
}

export default LoginPrompt
