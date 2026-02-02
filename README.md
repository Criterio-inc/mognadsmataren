# Mognadsmätaren

Digital mognadsbedömning för ledningsgrupper.

## Funktioner

- **22 påståenden** inom 4 strategiska dimensioner
- **Animerad visualisering** med mätare, radar och stapeldiagram
- **AI-genererade insikter** via OpenRouter
- **Flerspråksstöd** (svenska/engelska)
- **Team-aggregering** för att jämföra resultat

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Drizzle
- **AI**: OpenRouter (Claude/GPT-4)
- **Hosting**: Vercel

## Kom igång

```bash
# Installera dependencies
npm install

# Konfigurera miljövariabler
cp .env.local.example .env.local
# Lägg till DATABASE_URL och OPENROUTER_API_KEY

# Pusha databasschema
npx drizzle-kit push

# Starta dev-server
npm run dev
```

## Dimensioner

1. **Gemensam Bild** - Förståelse för digitaliseringens innebörd
2. **Strategisk Koppling** - Koppling till verksamhetsmål
3. **Prioritering & Beslut** - Förmåga att prioritera och besluta
4. **Ägarskap & Genomförande** - Ansvar, förändringsledning och helhetssyn

## Mognadsnivåer

| Nivå | Namn | Poängintervall |
|------|------|----------------|
| 1 | Ingen aning | 1.0 - 1.4 |
| 2 | Känner till det | 1.5 - 2.4 |
| 3 | Kunnig | 2.5 - 3.4 |
| 4 | Planerat | 3.5 - 4.4 |
| 5 | Igång | 4.5 - 5.0 |

---

Utvecklat av [Curago](https://curago.se)
