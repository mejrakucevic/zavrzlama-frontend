import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { getErrorMessage } from '../services/api'

const MIN_PASSWORD_LENGTH = 8

function RegisterPage() {
  const { user, register } = useAuth()
  const navigate = useNavigate()

  // Jedno stanje za sva polja forme
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to="/games" replace />

  // Jedna funkcija za sva polja: ime polja (name="...") određuje šta se menja
  function updateField(event: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    // Brza provera u pregledaču, da korisnik ne čeka server.
    // Server svejedno proverava sve, jer frontendu ne smemo verovati.
    if (form.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Lozinka mora imati bar ${MIN_PASSWORD_LENGTH} znakova.`)
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Lozinke se ne poklapaju.')
      return
    }

    setIsSubmitting(true)
    try {
      await register({ username: form.username, email: form.email, password: form.password })
      navigate('/games', { replace: true })
    } catch (submitError) {
      setError(getErrorMessage(submitError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page" aria-labelledby="register-title">
      <p className="eyebrow">NALOG / REGISTRACIJA</p>
      <h1 id="register-title">Pridruži se<br /><em>takmičenju.</em></h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Korisničko ime
          <input
            name="username"
            autoComplete="username"
            required
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_]+"
            title="Samo slova (bez kvačica), brojevi i _"
            value={form.username}
            onChange={updateField}
          />
          <small>3–20 znakova: slova, brojevi i _. Prikazuje se na rang listi.</small>
        </label>

        <label>
          Email
          <input name="email" type="email" autoComplete="email" required value={form.email} onChange={updateField} />
        </label>

        <label>
          Lozinka
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={form.password}
            onChange={updateField}
          />
          <small>Najmanje {MIN_PASSWORD_LENGTH} znakova.</small>
        </label>

        <label>
          Ponovi lozinku
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={form.confirmPassword}
            onChange={updateField}
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="retro-button" disabled={isSubmitting}>
          {isSubmitting ? 'Pravimo nalog…' : 'Napravi nalog'} <span aria-hidden="true">↗</span>
        </button>
      </form>

      <p className="auth-switch">
        Već imaš nalog? <Link to="/prijava" className="text-link">Prijavi se</Link>
      </p>
    </section>
  )
}

export default RegisterPage
