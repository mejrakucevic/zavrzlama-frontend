import type { LetterStatus } from './wordLogic'

const ROWS = [
  ['E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Š', 'Đ', 'Ž'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Č', 'Ć'],
  ['Enter', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]

interface WordKeyboardProps {
  keyStatuses: Record<string, LetterStatus>
  onKey: (key: string) => void
}

// Tastatura na ekranu (za telefone). Klik šalje isti taster kao fizička tastatura.
function WordKeyboard({ keyStatuses, onKey }: WordKeyboardProps) {
  return (
    <div className="word-keyboard" aria-label="Tastatura">
      {ROWS.map((row, index) => (
        <div className="word-keyboard-row" key={index}>
          {row.map((key) => (
            <button
              type="button"
              className="word-key"
              data-status={keyStatuses[key]}
              data-wide={key.length > 1 ? true : undefined}
              aria-label={key === 'Backspace' ? 'Obriši' : key === 'Enter' ? 'Potvrdi' : key}
              onClick={() => onKey(key)}
              key={key}
            >
              {key === 'Backspace' ? '⌫' : key === 'Enter' ? 'ENTER' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default WordKeyboard
