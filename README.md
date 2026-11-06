# Zavrzlama — frontend

Frontend univerzitetskog projekta Zavrzlama, platforme za dnevne logičke igre.
Trenutno sadrži osnovnu React aplikaciju sa TypeScript-om, Vite-om i Tailwind CSS-om.

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
Stranica treba da prikaže naslov „Zavrzlama“ i opis platforme.
Server se zaustavlja sa `Ctrl+C`.

`npm ci` instalira zavisnosti prema verzijama iz `package-lock.json`.
Taj fajl se čuva u Git-u da bi instalacije bile ponovljive.

## Stilizovanje sa Tailwind CSS-om

Tailwind CSS je povezan kroz dodatak `@tailwindcss/vite` u `vite.config.ts`.
Fajl `src/index.css` učitava Tailwind naredbom `@import "tailwindcss"`.
Koristimo Tailwind 4, pa za ovo osnovno podešavanje nisu potrebni
`tailwind.config.js` ni zasebna PostCSS konfiguracija.

Tailwind klase se navode u React atributu `className`. Na primer, u `App.tsx`:

- `text-4xl` određuje veličinu naslova, a `font-bold` debljinu slova.
- `text-violet-700` daje naslovu ljubičastu boju.
- `px-6` i `py-12` dodaju unutrašnji razmak horizontalno i vertikalno.
- `max-w-5xl` ograničava širinu sadržaja, a `mx-auto` centrira taj blok.

Za proveru pokreni `npm.cmd run dev`. Očekuj veliki, podebljan ljubičasti
naslov „Zavrzlama“, siv opis i svetlu pozadinu. Suzi prozor pregledača;
sadržaj treba da ostane čitljiv bez horizontalnog skrolovanja pri širini od
najmanje 320 piksela.

Zvanično uputstvo: https://tailwindcss.com/docs/installation/using-vite

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
  App.tsx        # Početna komponenta aplikacije
  index.css      # Osnovni stilovi
index.html       # Početni HTML dokument
vite.config.ts   # Vite i React plugin
tsconfig*.json   # TypeScript konfiguracija
eslint.config.js # Pravila za proveru koda
```

Backend se razvija u zasebnom repozitorijumu `zavrzlama-backend`.
Frontend u ovom koraku još ne komunicira sa backend-om.

`node_modules`, `dist`, `.env` i `.env.*` se ignorišu u Git-u.
Dozvoljen je `.env.example`, ali isključivo sa primerima bez tajnih vrednosti.
