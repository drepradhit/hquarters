# HQuarters Web Applications

Monorepo containing the official web applications for HQuarters Business Residence:
- **`hquarters-id`**: Main website in Indonesian.
- **`hquarters-en`**: Subdomain website in English.

## Structure
- `/hquarters-id` - Indonesian website (React + Vite + Tailwind CSS)
- `/hquarters-en` - English website (React + Vite + Tailwind CSS)

## Development
To run locally:
```bash
# Indonesian web (Default port: 3000)
cd hquarters-id
npm install
npm run dev

# English web (Default port: 3003)
cd hquarters-en
npm install
npm run dev
```

## Deployment on Vercel
Deploy as two separate projects in Vercel from this repository:
1. **HQuarters (Indonesian)**: Set Root Directory to `hquarters-id`.
2. **HQuarters Subdomain (English)**: Set Root Directory to `hquarters-en`.
