import { Link, NavLink, Outlet } from 'react-router'

function MainLayout() {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-violet-700">
            Zavrzlama
          </Link>
          <nav aria-label="Glavna navigacija" className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 font-medium ${isActive ? 'bg-violet-100 text-violet-800' : 'text-slate-600 hover:bg-slate-100'}`
              }
            >
              Početna
            </NavLink>
            <NavLink
              to="/igre"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 font-medium ${isActive ? 'bg-violet-100 text-violet-800' : 'text-slate-600 hover:bg-slate-100'}`
              }
            >
              Igre
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
