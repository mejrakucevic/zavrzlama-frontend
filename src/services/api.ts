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

// ----- Igra "Pogodi reč" -----

export interface WordGameToday {
  date: string // npr. "2026-11-17"
  wordLength: number
  maxAttempts: number
}

export interface GuessResponse {
  statuses: LetterStatus[]
  isCorrect: boolean
  answer?: string // server ga šalje samo kad je igra gotova
}

export async function getWordGameToday(signal?: AbortSignal): Promise<WordGameToday> {
  const { data } = await api.get<WordGameToday>('/games/word/today', { signal })
  return data
}

export async function submitWordGuess(guess: string, attempt: number): Promise<GuessResponse> {
  const { data } = await api.post<GuessResponse>('/games/word/guess', { guess, attempt })
  return data
}

// Izvuci poruku o grešci koju je poslao server (npr. "Ova reč nije u rečniku.")
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error) && error.response?.data?.message) {
    return error.response.data.message
  }
  return 'Server trenutno nije dostupan. Pokušaj ponovo.'
}
