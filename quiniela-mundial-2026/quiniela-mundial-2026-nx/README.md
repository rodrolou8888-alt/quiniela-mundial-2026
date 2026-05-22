# Quiniela Mundial 2026

App Next.js para quiniela colaborativa — sin cuentas para jugadores, sin backend propio.

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind
- JSONBin.io para persistencia y datos compartidos
- Polling cada 10s para updates en tiempo real
- Deploy: Vercel (gratis)

## Setup en 3 pasos

### 1. Crear cuenta en JSONBin.io
- Ir a https://jsonbin.io y crear cuenta (gratis)
- Crear un nuevo bin (vacío)
- Copiar el **Bin ID** (de la URL, algo como `xxxxxxxxxx`)
- Copiar el **Master Access Key** (del perfil del bin)

### 2. Configurar variables de entorno
```bash
# En .env.local (copiar de .env.local.example)
NEXT_PUBLIC_JSONBIN_BIN_ID=tu_bin_id
JSONBIN_ACCESS_KEY=tu_master_key
NEXT_PUBLIC_ADMIN_PASSWORD=mundial2026
```

### 3. Deployar en Vercel
```bash
npm i -g vercel
vercel
```

## Uso

**Jugadores:** abren la URL → ponen su nombre → llenan sus 72 pronósticos de grupo → enviado

**Admin:** van a `/admin` → password: `mundial2026` → van actualizando marcadores uno por uno → guardar

**Leaderboard:** se actualiza solo cada 10s para todos

## Estructura
```
├── app/
│   ├── page.tsx          ← predictions + leaderboard
│   └── admin/page.tsx    ← admin: cargar resultados
├── lib/
│   └── store.ts          ← acceso a JSONBin
├── data/
│   └── matches.ts        ← 104 partidos (72 grupo + 32 knockout)
└── .env.local            ← credenciales JSONBin
```

## Scoring
| Resultado | Puntos |
|---|---|
| Marcador exacto | 3 pts |
| Winner/empate correcto | 1 pt |
| Fallo | 0 pts |

## Desarrollo local
```bash
npm run dev
# Abrir http://localhost:3000
```