import type { GuessResult } from './wordLogic'

// Napredak u igri čuvamo u pregledaču (localStorage), posebno za svaki dan.
// Tako osvežavanje stranice ne briše pokušaje.
export interface SavedWordGame {
  guesses: GuessResult[]
  answer?: string
}

function storageKey(date: string) {
  return `zavrzlama:pogodi-rec:${date}`
}

export function loadWordGame(date: string): SavedWordGame {
  try {
    const saved = localStorage.getItem(storageKey(date))
    if (saved) {
      const parsed = JSON.parse(saved) as SavedWordGame
      if (Array.isArray(parsed.guesses)) return parsed
    }
  } catch {
    // localStorage nije dostupan ili sadrži pokvaren JSON: počni od nule
  }
  return { guesses: [] }
}

export function saveWordGame(date: string, game: SavedWordGame) {
  try {
    localStorage.setItem(storageKey(date), JSON.stringify(game))
  } catch {
    // Ako čuvanje ne uspe, igra i dalje radi, samo se napredak ne pamti
  }
}
