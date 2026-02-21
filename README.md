# 🛍️ Ecommerce Perfumes - Frontend

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blueviolet)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-success)
![API](https://img.shields.io/badge/API-Render-orange)

Frontend de un ecommerce de perfumes desarrollado con **React + Vite**, consumiendo una API REST propia desplegada en Render.

Este proyecto forma parte de una solución fullstack que simula un ecommerce real con autenticación, gestión de productos y órdenes.

---

## 🌐 Live Demo

🔗 **Frontend:** https://eccomerce-perfumes.netlify.app/  
🔗 **API:** https://ecommerceperfumesapi.onrender.com  

⚠️ Nota: Si la API está en estado "sleep" (Render free tier), puede tardar unos segundos en responder la primera vez.
---

## 🚀 Tecnologías utilizadas

* React 19
* Vite
* React Router
* Bootstrap / React-Bootstrap
* Fetch API
* JWT (autenticación)
* Netlify (deploy)

---

## 🏗️ Arquitectura

- Frontend SPA desarrollado en React
- API REST propia desplegada en Render
- Autenticación JWT
- Comunicación vía Fetch API
- Protección de rutas basada en roles

---

## ⚙️ Características técnicas

- Manejo global de estado con Context API
- Persistencia de sesión con JWT
- Validación de token y expiración
- Manejo centralizado de errores HTTP
- Protección de rutas privadas
- Manejo de roles (admin / user)
- Configuración de variables de entorno por ambiente
- Deploy automatizado con Netlify

---

## 🧪 Cómo probar la aplicación

1. Registrarse como nuevo usuario
2. Iniciar sesión
3. Agregar productos al carrito
4. En carrito finalizar compra o seguir agregando
5. En panel de usuario podemos ver las ordenes que hicimos

## 🔗 Backend

Este frontend consume una API propia:

👉 https://ecommerceperfumesapi.onrender.com

Repositorio del backend:

👉 https://github.com/Eze-Nat/ecommercePerfumesAPI

---

## 📦 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Eze-Nat/eccomercePerfumes.git
cd eccomercePerfumes
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Variables de entorno

Crear archivo `.env`:

```env
VITE_BASE_SERVER_URL=http://localhost:3000
```

Para producción (ya configurado en Netlify):

```env
VITE_BASE_SERVER_URL=https://ecommerceperfumesapi.onrender.com
```

---

### 4️⃣ Ejecutar proyecto

```bash
npm run dev
```

---

### 5️⃣ Build de producción

```bash
npm run build
npm run preview
```

---

## 🔐 Autenticación

El sistema utiliza JWT.

* Login genera token
* Se guarda en `localStorage`
* Se envía automáticamente en requests protegidos

---

## 🧴 Funcionalidades

* Listado de productos
* Búsqueda de perfumes
* Carrito de compras
* Login / Registro
* Panel de administración
* CRUD de productos (admin)
* Control de stock
* Protección de rutas por rol

---


## ⚠️ Notas importantes

* El frontend depende del backend activo
* Si el backend está "sleep" en Render, puede tardar en responder
* Las imágenes se sirven desde el backend

---

## 👥 Trabajo colaborativo

Proyecto desarrollado en equipo como práctica de:

* Consumo de APIs REST
* Manejo de estado global
* Autenticación con JWT
* Arquitectura frontend escalable
* Integración frontend-backend

---

## 📌 Estado del proyecto

✔️ Integración completa con backend
✔️ Deploy en Netlify
✔️ Autenticación funcional
✔️ Panel admin
✔️ Manejo de errores
✔️ Formateo de datos

---



## 📄 Licencia

Proyecto con fines educativos.

---

💡 Proyecto fullstack desarrollado como práctica profesional real.
