# BiblioTech Dashboard

Sistema moderno de gestión de bibliotecas con un panel interactivo construido con Next.js 16, MongoDB y Redux Toolkit.

## Grupo Mish

- **Pablo Cortés**: 20.600.436-3
- **Renata Cuello**: 20.949.079-K
- **Diego Castro**: 18.633.660-7
- **Fabricha Ramírez**: 20.990.386-5

## Características

- Panel interactivo con más de 5 tipos de gráficos (Barras, Circular, Línea, Área, Radar)
- Operaciones CRUD completas para la gestión de libros
- Sistema de filtrado persistente con Redux Toolkit
- Base de datos MongoDB con Mongoose ODM
- API REST con Next.js App Router
- Diseño responsivo "Mobile-first"
- Estadísticas en tiempo real

## Stack Tecnológico

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Gestión de Estado**: Redux Toolkit con persistencia en localStorage
- **Base de Datos**: MongoDB + Mongoose
- **Gráficos**: Recharts
- **Componentes UI**: Shadcn/ui + Lucide React
- **Validación**: Validación de Esquemas Mongoose

## Prerrequisitos

- Node.js 18.17 o superior
- MongoDB Atlas (capa gratuita) o instancia local de MongoDB
- npm o yarn

## Instalación

Si se quiere usar la aplicación sin necesidad de levantar un servidor local, se puede usar el siguiente enlace:

[https://bibliotech-dashboard.vercel.app/](https://bibliotech-dashboard.vercel.app/)

### 1. Clonar el repositorio
```bash
git clone [REPOSITORY_URL]
cd bibliotech-dashboard
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bibliotech?retryWrites=true&w=majority
```

### 4. Configuración de MongoDB Atlas

1. Crear clúster gratuito en [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crear usuario de base de datos con contraseña
3. Copiar cadena de conexión y actualizar `.env.local`

### 5. Poblar la base de datos
```bash
npm run seed
```

Este comando creará múltiples libros de ejemplo en la base de datos.

### 6. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
bibliotech-dashboard/
├── app/
│   ├── api/
│   │   ├── libros/
│   │   │   ├── route.ts          # GET (todos), POST (crear)
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE (por ID)
│   │   └── estadisticas/
│   │       └── route.ts          # GET estadísticas del dashboard
│   ├── dashboard/
│   │   └── page.tsx              # Página del Dashboard
│   ├── libros/
│   │   └── page.tsx              # Catálogo de libros
│   ├── layout.tsx                # Layout raíz
│   └── page.tsx                  # Página de inicio
├── components/
│   ├── ui/                       # Componentes Shadcn/ui
│   └── FiltrosLibros.tsx         # Panel de filtros
├── lib/
│   ├── mongodb.ts                # Conexión a MongoDB
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── filtrosSlice.ts   # Estado de filtros
│   │   │   └── librosSlice.ts    # Estado de libros
│   │   ├── store.ts              # Store de Redux
│   │   └── ReduxProvider.tsx     # Provider con persistencia
│   └── utils.ts                  # Utilidades
├── models/
│   └── Libro.ts                  # Modelo Mongoose
├── scripts/
│   └── seed.ts                   # Script de poblado de base de datos
└── types/
    ├── index.ts                  # Tipos TypeScript
    └── mongoose.d.ts             # Tipos globales de Mongoose
```

## Endpoints de la API

### Libros

| Método | Endpoint | Descripción | Parámetros de Consulta |
|--------|----------|-------------|------------------------|
| GET | `/api/libros` | Obtener todos los libros | `?busqueda=text&categoria=Ficción&idioma=Español&disponibilidad=todos&ordenarPor=titulo&orden=asc` |
| POST | `/api/libros` | Crear nuevo libro | - |
| GET | `/api/libros/[id]` | Obtener libro por ID | - |
| PUT | `/api/libros/[id]` | Actualizar libro | - |
| DELETE | `/api/libros/[id]` | Eliminar libro | - |

### Estadísticas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estadisticas` | Obtener todas las estadísticas |

**Ejemplo de Respuesta:**
```json
{
  "totalLibros": 15,
  "librosDisponibles": 45,
  "totalPrestamos": 234,
  "ratingPromedio": 4.5,
  "categorias": [...],
  "distribuccionIdiomas": [...],
  "librosMasPrestados": [...]
}
```

## Modelo de Datos

### Esquema de Libro (Mongoose)

```typescript
{
  titulo: string;              // Requerido
  autor: string;               // Requerido
  isbn: string;                // Requerido, único
  categoria: string;           // Enum: 14 categorías
  descripcion?: string;
  portada?: string;            // URL de imagen
  editorial: string;
  anioPublicacion: number;
  idioma: string;              // Enum: Español, Inglés, Francés, etc.
  numeroPaginas: number;
  disponibles: number;         // Copias disponibles
  totalCopias: number;         // Copias totales
  prestamos: number;           // Préstamos totales
  rating: number;              // 0-5
  fechaAdquisicion: Date;
  createdAt: Date;             // Autogenerado
  updatedAt: Date;             // Autogenerado
}
```

## Funcionalidades Principales

### Dashboard
- **Tarjetas de Estadísticas**: Total de libros, copias disponibles, préstamos, calificación promedio
- **Gráfico de Barras**: Distribución de libros por categoría
- **Gráfico Circular**: Libros por idioma
- **Gráfico de Línea**: Top 10 libros más prestados
- **Gráfico de Área**: Tendencia de préstamos en el tiempo
- **Gráfico de Radar**: Análisis multidimensional de categorías

### Catálogo de Libros
- **Búsqueda**: Por título, autor o descripción
- **Filtros**: Categoría, idioma, disponibilidad, estado
- **Ordenamiento**: Por título, autor, año, calificación, préstamos
- **Persistencia**: Los filtros se mantienen al recargar la página

### Gestión de Estado con Redux
- **filtrosSlice**: 8 acciones para gestión de filtros
- **librosSlice**: 6 acciones para operaciones CRUD
- **Persistencia**: Sincronización automática con localStorage

## Scripts

```bash
# Servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting del código
npm run lint

# Poblar base de datos
npm run seed
```

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGODB_URI` | Cadena de conexión a MongoDB | `mongodb+srv://...` |

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
