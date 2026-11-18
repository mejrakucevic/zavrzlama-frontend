import axios from 'axios'
import type { LetterStatus } from '../components/games/wordLogic'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

export async function checkServerHealth(signal: AbortSignal): Promise<void> {
  const { data } = await api.get<{ status?: string; service?: string }>('/health', { signal })

  if (data?.status !== 'ok' || data?.service !== 'zavrzlama-backend') {
    throw new Error('Neočekivan odgovor servera.')
  }
}

// ----- Nalozi (autentifikacija) -----
// Token je u httpOnly kolačiću: pregledač ga sam šalje, mi ga nikad ne diramo.

export interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export async function registerUser(input: RegisterData): Promise<User> {
  const { data } = await api.post<{ user: User }>('/auth/register', input)
  return data.user
}

export async function loginUser(email: string, password: string): Promise<User> {
  const { data } = await api.post<{ user: User }>('/auth/login', { email, password })
  return data.user
}

export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout')
}

// Vrati prijavljenog korisnika, ili null ako niko nije prijavljen
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await api.get<{ user: User }>('/auth/me')
    return data.user
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) return null
    throw error
  }
}

// ----- Rang lista -----

export type LeaderboardPeriod = 'day' | 'week' | 'all'

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  totalScore: number
  gamesPlayed: number
}

export interface Leaderboard {
  period: LeaderboardPeriod
  game: string
  entries: LeaderboardEntry[]
  // Mesto prijavljenog korisnika; null ako nije prijavljen ili nema rezultata u tom periodu
  me: { rank: number; totalScore: number; gamesPlayed: number } | null
}

export async function getLeaderboard(period: LeaderboardPeriod, game: string, signal?: AbortSignal) {
  const { data } = await api.get<Leaderboard>('/leaderboard', { params: { period, game }, signal })
  return data
}

// ----- Igra "Pogodi reč" -----

// Stanje današnje partije, onako kako ga čuva server
export interface WordGameState {
  guesses: { word: string; statuses: LetterStatus[] }[]
  status: 'playing' | 'won' | 'lost'
  score: number
  answer?: string // server ga šalje samo kad je igra gotova
}

export interface WordGameToday {
  date: string // npr. "2026-11-18"
  wordLength: number
  maxAttempts: number
  game: WordGameState
}

export async function getWordGameToday(signal?: AbortSignal): Promise<WordGameToday> {
  const { data } = await api.get<WordGameToday>('/games/word/today', { signal })
  return data
}

// Server sam broji pokušaje, pa šaljemo samo reč
export async function submitWordGuess(guess: string): Promise<WordGameState> {
  const { data } = await api.post<{ game: WordGameState }>('/games/word/guess', { guess })
  return data.game
}

// Izvuci poruku o grešci koju je poslao server (npr. "Ova reč nije u rečniku.")
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error) && error.response?.data?.message) {
    return error.response.data.message
  }
  return 'Server trenutno nije dostupan. Pokušaj ponovo.'
}
