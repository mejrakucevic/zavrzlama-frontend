import { Link } from 'react-router'

function HomePage() {
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold text-violet-700">Zavrzlama</h1>
      <p className="mb-6 text-lg text-slate-600">Platforma za dnevne logičke igre.</p>
      <Link
        to="/igre"
        className="inline-block rounded-lg bg-violet-700 px-4 py-2 font-medium text-white hover:bg-violet-800"
      >
        Pogledaj igre
      </Link>
    </>
  )
}

export default HomePage
