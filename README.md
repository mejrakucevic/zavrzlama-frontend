# Zavrzlama — frontend

Frontend univerzitetskog projekta Zavrzlama, platforme za dnevne logičke igre.
Koristi React, TypeScript, Vite, Tailwind CSS i React Router.
Backend je u zasebnom repozitorijumu `zavrzlama-backend`.
Frontend trenutno još ne komunicira sa backendom.

## Pokretanje

Provereno okruženje: Node.js 24.14.0 i npm 11.9.0.
Iz foldera `zavrzlama-frontend` pokreni:

```powershell
npm.cmd ci
npm.cmd run dev
```

Otvori adresu iz terminala (obično http://localhost:5173).
Server se zaustavlja sa Ctrl+C. Na drugim sistemima koristi `npm` umesto
`npm.cmd`, koji ovde zaobilazi PowerShell ograničenja za npm.ps1.
`npm ci` instalira verzije iz package-lock.json, koji se čuva u Git-u.

## Struktura

```text
src/
  components/layout/MainLayout.tsx # Zajedničko zaglavlje, navigacija i Outlet
  pages/HomePage.tsx               # Početna stranica
  pages/GamesPage.tsx              # Osnovna stranica za igre
  pages/NotFoundPage.tsx           # Nepostojeća adresa
  main.tsx                        # React i BrowserRouter
  App.tsx                         # Definicije ruta
  index.css                       # Tailwind i osnovni stilovi
index.html                        # Početni HTML dokument
vite.config.ts                    # Vite, React i Tailwind dodaci
tsconfig*.json                    # TypeScript konfiguracija
eslint.config.js                  # Pravila za proveru koda
```

## Stranice i navigacija

Koristimo paket `react-router` u deklarativnom režimu.
[Zvanično uputstvo za rute](https://reactrouter.com/start/declarative/routing).

- `BrowserRouter` u main.tsx povezuje navigaciju sa adresom u pregledaču.
- `Routes` i `Route` u App.tsx povezuju adrese sa komponentama stranica.
- `MainLayout` prikazuje zajedničko zaglavlje, a `Outlet` izabranu stranicu.
- `Link` menja adresu bez ponovnog učitavanja celog dokumenta.
- `NavLink` označava aktivnu stavku i postavlja aria-current.
- `end` na linku za / znači da je aktivan samo na početnoj adresi.

| Adresa | Sadržaj |
| --- | --- |
| / | Početna stranica sa linkom „Pogledaj igre” |
| /igre | Najava budućih igara |
| Ostale adrese | Poruka „Stranica nije pronađena” i povratak na početnu |

Pri kasnijem objavljivanju, hosting treba podesiti da nepoznate putanje
prosledi na index.html, kako bi direktno otvaranje /igre radilo.
Poruka za nepostojeću stranicu ovde je prikaz u React aplikaciji; nije
serverski HTTP 404 odgovor.

## Stilizovanje

Tailwind CSS 4 je povezan dodatkom @tailwindcss/vite u vite.config.ts.
src/index.css učitava ga naredbom `@import "tailwindcss"`.
Za ovo podešavanje nisu potrebni tailwind.config.js ni zaseban PostCSS fajl.
[Zvanično uputstvo](https://tailwindcss.com/docs/installation/using-vite).

Klase se pišu u React atributu className. Na primer:

- text-4xl određuje veličinu teksta, a font-bold debljinu slova.
- text-violet-700 daje tekstu ljubičastu boju.
- px-6 i py-12 dodaju unutrašnji horizontalni i vertikalni razmak.
- max-w-5xl ograničava širinu sadržaja, a mx-auto centrira blok.

## Provere

```powershell
npm.cmd run lint
npm.cmd run build
```

Lint proverava pravila za kod. Build prvo proverava TypeScript tipove,
pa pravi aplikaciju u folderu dist. Obe komande treba da prođu bez grešaka.
Za lokalni pregled build-a koristi `npm.cmd run preview` i adresu iz terminala.
To je lokalni pregled, a ne server za javno objavljivanje.

Instalacija u ovom koraku prijavila je 10 nalaza umerenog nivoa.
Zavisnosti nisu automatski menjane komandom npm audit fix --force.

### Ručna provera

Pokreni `npm.cmd run dev` i otvori adresu iz terminala.

1. Na / očekuj naslov „Zavrzlama” i aktivnu stavku „Početna”.
2. Klikni „Igre” ili „Pogledaj igre”: očekuj /igre, naslov „Igre” i aktivnu
   stavku „Igre”. Zaglavlje ostaje vidljivo.
3. Osveži /igre, pa otvori tu adresu direktno u novoj kartici: stranica radi.
4. Otvori /nepostojeca: očekuj poruku za nepostojeću stranicu, bez aktivne
   stavke u navigaciji. Link za povratak vodi na /.
5. Proveri dugmad Nazad/Napred u pregledaču i navigaciju pomoću Tab i Enter.
6. Suzi prozor na 320 piksela: nema horizontalnog skrolovanja.

## Git

node_modules, dist, .env i .env.* se ignorišu u Git-u.
Dozvoljen je .env.example, isključivo sa primerima bez tajnih vrednosti.