import { Route, Routes } from 'react-router'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="igre" element={<GamesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
