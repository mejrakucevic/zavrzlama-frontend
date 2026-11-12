# Zavrzlama — frontend

Frontend univerzitetskog projekta Zavrzlama, platforme za dnevne logičke igre.
Trenutno sadrži React aplikaciju sa TypeScript-om, Vite-om, Tailwind CSS-om
i navigacijom preko React Router-a. Interfejs koristi vintage estetiku sa
papirnom podlogom, serifnim naslovima i šarenim karticama igara.

## Preduslovi

- Node.js 24 LTS (projekat je proveren sa verzijom 24.22.1).
- npm (projekat je proveren sa verzijom 11.19.1).

Komande ispod koriste `npm.cmd` zbog PowerShell ograničenja za `npm.ps1`.
Na drugim sistemima koristi `npm` umesto `npm.cmd`.

## Instalacija i pokretanje

Iz foldera `zavrzlama-frontend`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Otvori adresu koju Vite ispiše u terminalu (obično http://localhost:5173).
Početna stranica prikazuje centriran naslov „Malo mozganja. Mnogo zabave.“,
kratak opis i dugme „Istraži igre“, uz jednostavnu retro SVG ilustraciju.
Na širokom ekranu grafika je pored teksta, a na uskom ispod njega.
Katalog kartica je na stranici `/games`.
Server se zaustavlja sa `Ctrl+C`.

`npm ci` instalira zavisnosti prema verzijama iz `package-lock.json`.
Taj fajl se čuva u Git-u da bi instalacije bile ponovljive.

## Stilizovanje sa Tailwind CSS-om

Tailwind CSS je povezan kroz dodatak `@tailwindcss/vite` u `vite.config.ts`.
Fajl `src/index.css` učitava Tailwind naredbom `@import "tailwindcss"`.
Koristimo Tailwind 4, pa za ovo osnovno podešavanje nisu potrebni
`tailwind.config.js` ni zasebna PostCSS konfiguracija.

Tailwind klase se navode u React atributu `className`. `GameGrid` koristi
`grid`, `gap-5`, `sm:grid-cols-2` i `lg:grid-cols-3` za prilagodljiv raspored.
Paleta i fontovi su definisani kroz `@theme` u `src/index.css`; isti fajl
sadrži zajedničke stilove dugmadi, navigacije i kartica. Serifni font Georgia
i sistemski fontovi rade bez preuzimanja spoljnih fontova.

Za proveru pokreni `npm.cmd run dev`. Očekuj krem podlogu sa diskretnom
teksturom, koralne akcente, krupne serifne naslove i šarene kartice.
Proveri prikaz na širinama 320, 768 i 1280 piksela, uključujući navigaciju
tastaturom. Na početnoj stranici tekst i dugme treba da budu centrirani,
uz jednu nenametljivu grafiku, bez dodatnih promotivnih sekcija.

Zvanično uputstvo: https://tailwindcss.com/docs/installation/using-vite

## Stranice i navigacija

`BrowserRouter` u `src/main.tsx` povezuje aplikaciju sa adresom i istorijom
pregledača. `src/App.tsx` definiše rute:

| Adresa | Komponenta | Sadržaj |
| --- | --- | --- |
| `/` | `HomePage` | Početna stranica i link ka igrama |
| `/games` | `GamesPage` | Katalog tri planirane igre |
| `/games/pogodi-rec` | `WordGamePage` | Prazna tabla za „Pogodi reč“ |
| Ostale adrese | `NotFoundPage` | Poruka o nepostojećoj stranici i povratak |

`MainLayout` sadrži zajedničko zaglavlje i navigaciju. `Outlet` označava mesto
na kom se prikazuje izabrana stranica. `Link` menja adresu bez ponovnog
učitavanja celog dokumenta, a `NavLink` dodatno označava aktivan link pomoću
atributa `aria-current="page"`. Tailwind klase koriste taj atribut za boju
aktivnog linka.

Ručna provera uz `npm.cmd run dev`:

1. Na početnoj stranici proveri da je „Početna“ označena u navigaciji.
2. Klikni „Igre“: adresa treba da se završi sa `/games`, a „Igre“ da budu označene.
3. Proveri dugmad Back i Forward u pregledaču.
4. Osveži `/games` i otvori tu adresu direktno u novom tabu.
5. Otvori `/nepostojeca`: očekuj poruku „Stranica nije pronađena“.
6. Klikni „Nazad na početnu“, pa na početnoj klikni „Istraži igre“.
7. Koristi Tab i Enter za linkove i proveri prikaz pri širini od 320 piksela.

Pri objavljivanju aplikacije hosting treba da vraća `index.html` za frontend
adrese poput `/games`. Time React Router može da prikaže stranicu i kada se
adresa otvori direktno. To ćemo podesiti u fazi deployment-a.

Dokumentacija: https://reactrouter.com/start/declarative/routing

## Katalog igara

Stranica `/games` prikazuje tri planirane igre:

- **Najduža reč** — od 12 ponuđenih slova sastavi najdužu važeću reč.
- **Pogodi državu** — pronađi skrivenu državu uz tragove o udaljenosti.
- **Pogodi reč** — pogodi reč od pet slova u najviše šest pokušaja.

Igre sa rečima planirane su na srpskoj latinici, uključujući `č`, `ć`, `š`,
`ž` i `đ`. `lj`, `nj` i `dž` tretiraće se kao jedno slovo.
Proveru reči i ova pravila implementiraćemo tokom razvoja pojedinačnih igara.

Kartice sadrže opis i oznaku „U pripremi“; igre još nisu dostupne za igranje.
Kartica „Pogodi reč“ ima link „Pogledaj tablu“ za pregled početnog ekrana igre.

- `src/data/games.ts` sadrži podatke i TypeScript interfejs `Game`.
- `src/components/GameCard.tsx` prikazuje jednu igru dobijenu kroz prop `game`.
- `src/components/GameGrid.tsx` pomoću `map` pravi karticu za svaku igru.
- `key={game.id}` daje React-u stabilan identifikator svake stavke u listi.

Ručna provera: otvori `/games` i proveri da postoje tačno tri kartice, svaka
sa naslovom, opisom i oznakom „U pripremi“. Samo „Pogodi reč“ ima link ka tabli.
Na uskom ekranu prikazuje se jedna kolona, od 640 piksela dve, a od 1024
piksela tri kolone. Proveri i da navigacija i dalje radi.

## Tabla za „Pogodi reč“

`WordGamePage` prikazuje uputstvo i komponentu `WordBoard`. Tabla ima šest
redova sa po pet kvadratnih polja. `Array.from` generiše redove i polja iz
konstanti `MAX_ATTEMPTS` i `WORD_LENGTH`; ovde su indeksi stabilni ključevi
jer se raspored praznih polja ne menja.

Ovo je statičan prikaz: unos, provera reči i boje rezultata dolaze kasnije.
Tabla ima pristupačan opis za čitače ekrana i prilagođava se širini ekrana.

Za proveru otvori `/games`, klikni „Pogledaj tablu“ na kartici „Pogodi reč“
i očekuj 30 praznih polja u rasporedu 6 × 5. Proveri direktno otvaranje i
osvežavanje `/games/pogodi-rec`, povratak na katalog i prikaz na širini od
320 piksela. U navigaciji treba da ostane označeno „Igre“.

## Veza sa backend-om

U zasebnom terminalu pokreni backend iz susednog repozitorijuma:

```powershell
cd ..\zavrzlama-backend
npm.cmd run dev
```

Frontend pokreni u svom terminalu iz foldera `zavrzlama-frontend`.
Vite razvojni proxy u `vite.config.ts` prosleđuje `/api` zahteve na
`http://127.0.0.1:5000`. Ako backend koristi drugi port, promeni proxy adresu.

`src/services/api.ts` koristi Axios za `GET /api/health`, sa ograničenjem
čekanja od pet sekundi i proverom očekivanog odgovora. `BackendStatus`
na početnoj stranici prikazuje proveru, dostupnu vezu ili nedostupan server.
Zahtev se prekida pri uklanjanju komponente; neuspešna provera nudi dugme
„Proveri ponovo“. Provera se pokreće pri otvaranju početne stranice i pri
ponovnom pokušaju, a ne neprekidno u pozadini.

Za ručnu proveru:

1. Pokreni oba servera i otvori početnu stranicu. Pri dnu očekuj poruku
   „Veza sa serverom je uspostavljena“.
2. Zaustavi backend i osveži početnu. Očekuj „Server trenutno nije dostupan“.
3. Ponovo pokreni backend i klikni „Proveri ponovo“. Očekuj uspešnu vezu.
4. Proveri da katalog i navigacija rade i kada backend nije dostupan.

Health ruta potvrđuje dostupnost servera. Katalog igara ostaje lokalni niz
podataka, jer backend još ne nudi API za igre.
Proxy je konfiguracija lokalnog Vite servera, ne zamena za podešavanje API
adrese i prosleđivanja zahteva pri deployment-u.

## Provere i build

```powershell
npm.cmd run lint
npm.cmd run build
```

`lint` proverava pravila za JavaScript, TypeScript i React kod.
`build` prvo proverava TypeScript tipove, pa pravi aplikaciju u folderu `dist`.
Obe komande treba da prođu bez grešaka.

Pri inicijalnoj proveri `npm audit` prijavljuje 10 nalaza umerenog nivoa u
razvojnim zavisnostima, povezanih sa paketom `minimatch` koji koristi ESLint.
`npm.cmd audit --omit=dev` prolazi bez nalaza. Automatski predlog
`npm audit fix --force` menja verzije razvojnih alata na nekompatibilan način,
pa nije primenjen. Ove nalaze treba ponovo proveriti pri ažuriranju alata.

Za lokalni pregled prethodno napravljene aplikacije:

```powershell
npm.cmd run preview
```

Otvori adresu iz terminala (obično http://localhost:4173).
Ovo je lokalni pregled build-a, a ne server za javno objavljivanje.

## Struktura

```text
src/
  main.tsx       # Povezuje React sa HTML elementom #root
  App.tsx        # Definicije ruta
  index.css      # Osnovni stilovi
  components/
    games/
      WordBoard.tsx # Tabla sa šest redova i pet kolona
    BackendStatus.tsx # Status veze sa serverom i ponovni pokušaj
    GameCard.tsx     # Kartica jedne igre
    GameGrid.tsx     # Zajednički prikaz liste igara
    PuzzleIllustration.tsx # Dekorativna retro SVG grafika
  data/
    games.ts        # Podaci za katalog igara i interfejs Game
  layouts/
    MainLayout.tsx   # Zajednički raspored i navigacija
  pages/
    HomePage.tsx     # Početna stranica
    GamesPage.tsx    # Stranica igara
    NotFoundPage.tsx # Nepostojeća adresa
    WordGamePage.tsx # Početni ekran igre „Pogodi reč“
  services/
    api.ts          # Axios pristup health ruti
index.html       # Početni HTML dokument
vite.config.ts   # Vite i React plugin
tsconfig*.json   # TypeScript konfiguracija
eslint.config.js # Pravila za proveru koda
```

Backend se razvija u zasebnom repozitorijumu `zavrzlama-backend`.
Frontend komunicira sa njegovom health rutom preko lokalnog Vite proxy-ja.

`node_modules`, `dist`, `.env` i `.env.*` se ignorišu u Git-u.
Dozvoljen je `.env.example`, ali isključivo sa primerima bez tajnih vrednosti.
