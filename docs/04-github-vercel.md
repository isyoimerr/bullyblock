# GitHub y despliegue en Vercel

## 1. Preparar GitHub

```bash
git init
git add .
git commit -m "BullyBlock: primer estado funcional"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bullyblock.git
git push -u origin main
```

## 2. Variables de entorno

Crear `.env` local usando `.env.example` y mantener estos valores:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

No subir credenciales reales al repositorio.

## 3. Preparar Vercel

1. Crear proyecto en Vercel
2. Importar el repositorio de GitHub
3. usar framework Vite
4. build command: `npm run build`
5. output directory: `dist`
6. agregar variables de entorno en Vercel
7. hacer deploy

## 4. Configuración de dominio

- site URL en Supabase debe apuntar al dominio de Vercel
- agregar redirect URLs para login y recovery
- revisar CSP y headers en `vercel.json`

## 5. Flujos recomendados

- rama main para producción
- ramas de feature para pruebas
- merge solo después de revisión visual y validación de login

## 6. Checklist final antes de deploy

- app compila
- theme funciona en light/dark
- login y rutas responden
- env vars listas
- repositorio actualizado
- vercel.json presente
- base Supabase conectada
