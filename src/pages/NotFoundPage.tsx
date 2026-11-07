import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold text-violet-700">Stranica nije pronađena</h1>
      <p className="mb-6 text-lg text-slate-600">Proveri adresu ili se vrati na početnu stranicu.</p>
      <Link to="/" className="font-medium text-violet-700 underline hover:text-violet-900">
        Povratak na početnu
      </Link>
    </>
  )
}

export default NotFoundPage
