import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import GamesPage from './pages/GamesPage'
import HomePage from './pages/HomePage'
import LeaderboardPage from './pages/LeaderboardPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import WordGamePage from './pages/WordGamePage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/pogodi-rec" element={<WordGamePage />} />
        <Route path="rang-lista" element={<LeaderboardPage />} />
        <Route path="prijava" element={<LoginPage />} />
        <Route path="registracija" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
