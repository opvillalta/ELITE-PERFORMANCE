<div align="center">
  <h1>💪 ELITE PERFORMANCE</h1>
  <p><strong>GYMApp</strong> — Aplicación móvil moderna para gestión de entrenamientos, progreso y servicios de gimnasio</p>
  <br />
  
  ![React](https://img.shields.io/badge/React-18-blue?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)
</div>

---

## 📱 Sobre el Proyecto

**ELITE PERFORMANCE** es una aplicación integral para entrenamiento personal en gimnasios. Permite a los usuarios:

- ✅ **Gestionar Rutinas**: crear y seguir planes de entrenamiento personalizados
- 📊 **Rastrear Progreso**: historial de sesiones, PRs (máximos levantados) y métricas
- 🏋️ **Registrar Entrenamientos**: logger en tiempo real de series, reps y peso
- 🗓️ **Clases Grupales**: reservar Spinning, Yoga, HIIT, Zumba, Pilates, Box
- 🛁 **Amenidades**: usar Sauna, Vapor, Jacuzzi, Piscina, Baño Turco

---

## 🚀 Stack Tecnológico

| Herramienta | Versión | Propósito |
|-------------|---------|----------|
| **React** | 18 | UI framework |
| **TypeScript** | 5 | Type safety |
| **Vite** | 5 | Build tool |
| **Tailwind CSS** | 3 | Styling |
| **Motion** (Framer Motion) | Latest | Animaciones |
| **Lucide React** | Latest | Iconografía |
| **Vitest** | Latest | Testing |

---

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes de UI
│   ├── HomeView.tsx        # Vista principal
│   ├── RoutineDetailView.tsx
│   ├── ActiveWorkoutView.tsx
│   ├── ProgressView.tsx    # Historial y PRs
│   ├── ProfileView.tsx
│   ├── ServicesView.tsx    # Clases + amenidades
│   ├── SignInView.tsx
│   ├── FloatingNav.tsx     # Barra de navegación
│   └── ui/                 # Componentes reutilizables
├── types.ts                # Interfaces TypeScript
├── data.ts                 # Datos iniciales
├── theme.tsx               # Tema Material Design 3
├── App.tsx                 # Componente raíz
└── main.tsx                # Entry point
```

---

## ⚙️ Instalación y Setup

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recomendado) o npm

### Quick Start

```bash
# Clonar repositorio
git clone https://github.com/opvillalta/ELITE-PERFORMANCE.git
cd ELITE-PERFORMANCE

# Instalar dependencias
pnpm install

# Correr en desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview
```

La app estará disponible en `http://localhost:5173`

---

## 📦 Scripts Disponibles

```bash
pnpm dev          # Desarrollo local con HMR
pnpm build        # Build optimizado para producción
pnpm preview      # Preview local del build
pnpm test         # Correr tests con Vitest
pnpm test:watch   # Tests en modo watch
pnpm test:ui      # UI de tests
```

---

## 🎨 Diseño y UX

### Color Scheme (Material Design 3 - Kinetic Dark)
- **Primary**: `#BFFF00` (Lime neon)
- **Surface**: `#131313` (Deep black)
- **On Surface**: `#e5e2e1` (Off-white)

### Componentes Base
- `Button` — Variantes: primary, secondary, ghost, accent
- `Card` — Contenedor con glass-morphism
- `Input` — Campo de texto con validación

---

## 🔐 Autenticación

Actualmente usa **simulación local** con localStorage:
- Email de demo: `admin.gym@elite.com`
- Password: `gym123`

Para integrar un backend real, modificar `SignInView.tsx` y agregar llamadas API.

---

## 💾 Persistencia de Datos

Todos los datos se guardan en **localStorage**:
- `gym_user_email` — Email del usuario
- `gym_routines` — Rutinas creadas
- `gym_workout_logs` — Historial de sesiones
- `gym_stats` — Estadísticas del usuario
- `gym_group_classes` — Clases disponibles
- `gym_amenities` — Amenidades
- `gym_service_bookings` — Reservas

---

## 🧪 Testing

```bash
# Correr tests
pnpm test

# Ver cobertura
pnpm test:coverage
```

Tests disponibles en `src/**/__tests__/*.test.tsx`

---

## 🚀 Deploy en Vercel

```bash
# Push a GitHub
git push origin main

# Vercel deployará automáticamente desde main branch
```

**Build settings:**
- Build command: `pnpm build`
- Output directory: `dist`

---

## 📝 Características Principales

### 1. **Tracking de Entrenamientos**
- Registrar series, reps y peso en tiempo real
- Calcular volumen total (peso × reps)
- Timer de descanso entre series

### 2. **Progreso Visible**
- Dashboard con stats semanales
- Historial de PRs por ejercicio
- Streak de días entrenados

### 3. **Servicios Adicionales**
- Reservar clases grupales con instructores
- Registrar uso de amenidades
- Ver horarios y disponibilidad

### 4. **Perfil de Usuario**
- Estadísticas acumuladas
- Nivel y experiencia
- Logout y reset de datos

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
pnpm install
```

### Build falla localmente
```bash
pnpm install --force
rm -rf node_modules/.vite
pnpm build
```

### Estilos no aplican
Asegurate que Tailwind esté corriendo:
```bash
# Check en src/index.css si está @import "tailwindcss"
pnpm dev
```

---

## 📄 Licencia

Apache-2.0

---

## 👤 Author

**Óscar Villalta** — [GitHub](https://github.com/opvillalta)
