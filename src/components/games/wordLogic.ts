import { WORDS } from '../../data/words'

export const MAX_ATTEMPTS = 6
export const WORD_LENGTH = 5

// correct = pravo slovo na pravom mestu (zeleno)
// present = slovo postoji u reči, ali na drugom mestu (žuto)
// absent  = slova nema u reči (sivo)
export type LetterStatus = 'correct' | 'present' | 'absent'

// Samo slova srpske latinice (bez Q, W, X, Y)
export const SERBIAN_LETTER = /^[abcčćdđefghijklmnoprsštuvzž]$/i

export function pickRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

// Uporedi pokušaj sa tajnom reči i vrati boju za svako slovo.
// Radi u dva prolaza da bi ponovljena slova bila ispravno obojena.
export function evaluateGuess(guess: string, answer: string): LetterStatus[] {
  const statuses: LetterStatus[] = Array(WORD_LENGTH).fill('absent')
  const remaining: Record<string, number> = {} // slova odgovora koja još nisu "potrošena"

  // 1. prolaz: zelena slova (pravo mesto)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answer[i]) {
      statuses[i] = 'correct'
    } else {
      remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1
    }
  }

  // 2. prolaz: žuta slova (postoje, ali na drugom mestu)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (statuses[i] === 'correct') continue

    const letter = guess[i]
    if (remaining[letter] > 0) {
      statuses[i] = 'present'
      remaining[letter]--
    }
  }

  return statuses
}

// Za tastaturu na ekranu: najbolja poznata boja za svako slovo.
// Zeleno je bolje od žutog, a žuto je bolje od sivog.
export function getKeyStatuses(guesses: string[], answer: string): Record<string, LetterStatus> {
  const priority: Record<LetterStatus, number> = { absent: 0, present: 1, correct: 2 }
  const result: Record<string, LetterStatus> = {}

  for (const guess of guesses) {
    const statuses = evaluateGuess(guess, answer)

    statuses.forEach((status, i) => {
      const letter = guess[i]
      const previous = result[letter]
      if (!previous || priority[status] > priority[previous]) {
        result[letter] = status
      }
    })
  }

  return result
}
