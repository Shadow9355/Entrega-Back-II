# 🛒 Ecommerce Backend API

Backend de un sistema ecommerce desarrollado con Node.js, Express y MongoDB, aplicando arquitectura profesional basada en capas, patrones de diseño y buenas prácticas de seguridad.

---

## 🚀 Tecnologías utilizadas

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Tokens)  
- Passport.js  
- Nodemailer  
- Bcrypt  

---

## 🧠 Arquitectura del proyecto

El proyecto está estructurado siguiendo una arquitectura en capas:


src/
│
├── controllers/ → Manejo de requests y responses
├── services/ → Lógica de negocio
├── repositories/ → Acceso a datos (DAO)
├── models/ → Esquemas de MongoDB
├── routes/ → Definición de endpoints
├── config/ → Configuraciones (JWT, mail, etc)
├── dto/ → Data Transfer Objects
├── middlewares/ → Autorización y autenticación


---

## 🔐 Autenticación y Autorización

- Autenticación con JWT  
- Estrategias implementadas con Passport  
- Middleware de autorización por roles  

### Roles:

- `admin` → gestión de productos  
- `user` → carrito y compras  

---

## 📦 Funcionalidades principales

### 👤 Usuarios

- Registro  
- Login  
- Endpoint `/current` con DTO (sin datos sensibles)  

---

### 🔐 Recuperación de contraseña

- Endpoint `POST /forgot-password`  
- Envío de email con token JWT (expira en 1 hora)  
- Endpoint `POST /reset-password`  

Validaciones:

- No reutilizar contraseña  
- Hasheo seguro con bcrypt  

---

### 🛒 Carrito

- Crear carrito automáticamente al registrar usuario  
- Agregar productos  
- Sumar cantidades  
- Asociación usuario-carrito  

---

### 🧾 Compra y Ticket

- Verificación de stock  
- Compra parcial o completa  
- Descuento de stock  
- Generación de ticket con:
  - purchaser (email)
  - amount
  - products
  - date  

- Actualización del carrito:
  - elimina productos comprados  
  - mantiene productos sin stock  

---

## ⚙️ Variables de entorno

Crear un archivo `.env` con:


JWT_SECRET=secreta

MAIL_USER=tuemail@gmail.com

MAIL_PASS=tu_app_password


⚠️ Importante: usar contraseña de aplicación de Gmail.

---

## 🧪 Testing

Todos los endpoints pueden ser probados con Postman.

### Flujo recomendado:

1. Register  
2. Login  
3. Current  
4. Forgot password  
5. Reset password  
6. Crear producto (admin)  
7. Agregar producto al carrito (user)  
8. Purchase  

---

## 📌 Endpoints principales

### Auth

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/current`

---

### Password Recovery

- `POST /api/users/forgot-password`
- `POST /api/users/reset-password`

---

### Products (admin)

- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

---

### Cart (user)

- `POST /api/cart/product/:pid`
- `POST /api/cart/purchase`

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como entrega final del curso backend, con el objetivo de:

- Aplicar arquitectura profesional  
- Implementar patrones de diseño (Repository, DTO)  
- Manejar autenticación y autorización  
- Desarrollar lógica real de ecommerce  

---

## 👨‍💻 Autor

Desarrollado por Agustin Cortez  

---