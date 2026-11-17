import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { getErrorMessage } from '../services/api'

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Kontrolisana polja: vrednost svakog polja je u stanju
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Gde da se vratimo posle prijave (ako nas je neka stranica poslala ovde)
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/games'

  // Već prijavljen korisnik nema šta da traži na ovoj stranici
  if (user) return <Navigate to={redirectTo} replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // spreči podrazumevano ponovno učitavanje stranice
    setError('')
    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate(redirectTo, { replace: true })
    } catch (submitError) {
      setError(getErrorMessage(submitError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page" aria-labelledby="login-title">
      <p className="eyebrow">NALOG / PRIJAVA</p>
      <h1 id="login-title">Dobro došao/la<br /><em>nazad.</em></h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Lozinka
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="retro-button" disabled={isSubmitting}>
          {isSubmitting ? 'Prijavljujemo…' : 'Prijavi se'} <span aria-hidden="true">↗</span>
        </button>
      </form>

      <p className="auth-switch">
        Nemaš nalog? <Link to="/registracija" className="text-link">Registruj se</Link>
      </p>
    </section>
  )
}

export default LoginPage
