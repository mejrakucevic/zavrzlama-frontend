export interface Game {
  id: string
  title: string
  description: string
  category: string
  tone: 'yellow' | 'coral' | 'blue' | 'green' | 'lilac'
  mark: string
  previewPath?: string
}

export const games: Game[] = [
  {
    id: 'redje',
    previewPath: '/games/redje',
    category: 'Retki odgovori',
    tone: 'lilac',
    mark: '1%',
    title: 'REĐE!',
    description: 'Pet pitanja, 20 sekundi po pitanju. Što ređi tačan odgovor, to više poena.',
  },
  {
    id: 'longest-word',
    category: 'Složi slova',
    tone: 'coral',
    mark: 'A…',
    title: 'Najduža reč',
    description: 'Od 12 ponuđenih slova sastavi najdužu važeću reč na srpskom.',
  },
  {
    id: 'globe',
    category: 'Malo geografije',
    tone: 'green',
    mark: '◎',
    title: 'Pogodi državu',
    description: 'Pronađi skrivenu državu koristeći tragove o udaljenosti.',
  },
  {
    id: 'word',
    previewPath: '/games/pogodi-rec',
    category: 'Za ljubitelje reči',
    tone: 'yellow',
    mark: 'Aa',
    title: 'Pogodi reč',
    description: 'Pogodi skrivenu reč od pet slova u najviše šest pokušaja.',
  },
]
