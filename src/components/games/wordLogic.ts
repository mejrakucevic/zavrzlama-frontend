export const MAX_ATTEMPTS = 6
export const WORD_LENGTH = 5

// correct = pravo slovo na pravom mestu (zeleno)
// present = slovo postoji u reči, ali na drugom mestu (žuto)
// absent  = slova nema u reči (sivo)
export type LetterStatus = 'correct' | 'present' | 'absent'

// Jedan poslat pokušaj: reč i boje koje je vratio server
export interface GuessResult {
  word: string
  statuses: LetterStatus[]
}

// Samo slova srpske latinice (bez Q, W, X, Y)
export const SERBIAN_LETTER = /^[abcčćdđefghijklmnoprsštuvzž]$/i

// Za tastaturu na ekranu: najbolja poznata boja za svako slovo.
// Zeleno je bolje od žutog, a žuto je bolje od sivog.
export function getKeyStatuses(guesses: GuessResult[]): Record<string, LetterStatus> {
  const priority: Record<LetterStatus, number> = { absent: 0, present: 1, correct: 2 }
  const result: Record<string, LetterStatus> = {}

  for (const guess of guesses) {
    guess.statuses.forEach((status, i) => {
      const letter = guess.word[i]
      const previous = result[letter]
      if (!previous || priority[status] > priority[previous]) {
        result[letter] = status
      }
    })
  }

  return result
}
