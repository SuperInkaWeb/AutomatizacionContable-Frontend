# AutoDoc Peru — Frontend

Interfaz React + Vite + Tailwind CSS para el sistema de extracción automática de documentos.

---

## Stack

* React 18 + Vite
* Tailwind CSS v4
* Axios (comunicación con el backend)
* SheetJS / xlsx (exportación a Excel)

---

## Instalación local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear archivo `.env`

```env
VITE_API_URL=http://localhost:8000
```

### 3. Ejecutar el proyecto

```bash
npm run dev
```

Aplicación disponible en:

```text
http://localhost:5173
```

---

## Variables de entorno

### Desarrollo local

```env
VITE_API_URL=http://localhost:8000
```

### Producción

Configurar la URL del backend desplegado en Render:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

---

## Estructura del proyecto

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## Funcionalidades

* Selector de tipo de documento:

  * Factura
  * Recibo de Luz
  * Asistencia Laboral

* Carga de archivos mediante:

  * Selección manual
  * Drag & Drop

* Visualización de datos extraídos en tabla

* Edición manual de registros

* Filtro por nombre o razón social

* Exportación de resultados a Excel mediante SheetJS

* Mensajes de error descriptivos para el usuario

---

## Deploy en Vercel

### 1. Crear cuenta

https://vercel.com

### 2. Importar proyecto

* New Project
* Importar repositorio GitHub del frontend

### 3. Configurar variables de entorno

Agregar:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

### 4. Deploy

Vercel generará automáticamente una URL pública y realizará nuevos despliegues con cada push al repositorio.

---

## Comunicación con el Backend

El frontend consume la API REST desarrollada en FastAPI mediante Axios.

Ejemplo:

```text
Frontend (Vercel)
        ↓
FastAPI Backend (Render)
        ↓
Supabase (Base de datos + Storage)
```
