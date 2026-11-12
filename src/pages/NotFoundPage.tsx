import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="page-intro not-found">
      <p className="eyebrow">GREŠKA 404 / POGREŠAN TRAG</p>
      <h1>Ova zavrzlama<br /><em>nema stranicu.</em></h1>
      <p>Tražena adresa ne postoji. Hajde da se vratimo na poznat teren.</p>
      <Link to="/" className="retro-button">Nazad na početnu <span aria-hidden="true">↗</span></Link>
    </section>
  )
}

export default NotFoundPage
