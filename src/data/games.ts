export interface Game {
  id: string
  name: string
  description: string
}

export const games: Game[] = [
  {
    id: 'pogadjanje-reci',
    name: 'Pogađanje reči',
    description: 'Otkrij skrivenu reč uz ograničen broj pokušaja i tragove o slovima.',
  },
  {
    id: 'povezivanje-pojmova',
    name: 'Povezivanje pojmova',
    description: 'Pronađi zajedničku vezu između pojmova i rasporedi ih u grupe.',
  },
  {
    id: 'ukrstenica',
    name: 'Ukrštenica',
    description: 'Reši zadate opise i popuni mrežu rečima koje se ukrštaju.',
  },
  {
    id: 'geografska-igra',
    name: 'Geografska igra',
    description: 'Pronađi skrivenu državu uz tragove o udaljenosti svojih pokušaja.',
  },
  {
    id: 'inkrementalna-igra',
    name: 'Inkrementalna igra',
    description: 'Sakupljaj resurse i kupuj unapređenja da postepeno povećaš proizvodnju.',
  },
]
