# Documentación Sistema de Farmacia

Este documento proporciona una descripción técnica completa del proyecto, incluyendo su arquitectura, estructura de directorios, y guías para la configuración y el desarrollo.

## 1. Visión General y Arquitectura

Este proyecto es una **Single Page Application (SPA)** construida con el stack **React + Vite** para el frontend y **Node.js + Express** para el backend. La arquitectura está diseñada para ser modular, escalable y fácil de mantener.

-   **Frontend**: Utiliza React para la interfaz de usuario, `react-router-dom` para la navegación, y **Zustand** para la gestión de estado global. La lógica de negocio y las llamadas a la API están encapsuladas en **Custom Hooks**, manteniendo los componentes de la UI limpios y centrados en la presentación.
-   **Backend**: Un servidor Express que expone una **API RESTful**. Se conecta a una base de datos **MySQL** y maneja toda la lógica de negocio, incluyendo autenticación, transacciones de base de datos y servicio de archivos estáticos.
-   **Base de Datos**: El esquema de MySQL está diseñado para soportar las operaciones de la farmacia, con relaciones claras entre medicamentos, ventas, clientes y proveedores.

## 2. Configuración del Entorno de Desarrollo

### Requisitos Previos
-   Node.js (v22 o superior)
-   npm
-   MySQL

### Pasos de Instalación

1.  **Clonar el Repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd Farmacia
    ```

2.  **Configurar el Backend**:
    ```bash
    cd Backend
    npm install
    ```
    -   Crea un archivo `.env` en la raíz de `Backend/` usando la siguiente plantilla:
        ```env
        DB_HOST=localhost
        DB_USER=tu_usuario_mysql
        DB_PASSWORD=tu_contraseña_mysql
        DB_DATABASE=Farmacia
        ```
    -   Importa el esquema y los datos iniciales ejecutando los scripts de `Backend/sql/` en tu base de datos MySQL:
        1.  `CrearDB.sql`
        2.  `vistas.sql`
        3.  `Insert.sql`
    -   Inicia el servidor backend:
        ```bash
        npm run dev
        ```
        El servidor estará disponible en `http://localhost:8080`.

3.  **Configurar el Frontend**:
    ```bash
    cd ../Frontend
    npm install
    ```
    -   Inicia la aplicación de desarrollo de Vite:
        ```bash
        npm run dev
        ```
        La aplicación estará disponible en `http://localhost:5173`.

## 3. Estructura de Directorios

### Backend (`/Backend`)

```
/Backend
├── config/
│   └── db.js               # Configuración de la conexión a la base de datos MySQL.
├── controllers/
│   ├── authController.js   # Lógica para login de usuarios.
│   └── ...                 # Controladores para cada entidad (clientes, medicamentos, etc.).
├── public/
│   └── images/medicamentos/ # Directorio público para servir imágenes de productos.
├── routes/
│   ├── authRoutes.js       # Rutas para la autenticación.
│   └── ...                 # Archivos de rutas para cada entidad.
├── sql/
│   ├── CrearDB.sql         # Script SQL para crear el esquema de la base de datos.
│   ├── Insert.sql          # Script para poblar la base de datos con datos iniciales.
│   └── vistas.sql          # Script para crear vistas y procedimientos almacenados.
├── .env                    # (Local) Variables de entorno (credenciales de DB).
└── index.js                # Punto de entrada del servidor Express.
```
-   **`controllers/`**: Separa la lógica de negocio de las rutas. Cada archivo maneja las operaciones CRUD para una entidad específica (ej: `usuariosController.js`).
-   **`routes/`**: Define los endpoints de la API (ej: `GET /api/usuarios`). Importa las funciones de los controladores correspondientes.
-   **`public/`**: Contiene archivos estáticos que se sirven directamente al cliente, como las imágenes de los productos.

### Frontend (`/Frontend`)

```
/Frontend
├── src/
│   ├── assets/             # Imágenes y otros recursos estáticos.
│   ├── components/
│   │   ├── admin/          # Componentes reutilizables específicos del panel de admin.
│   │   ├── login.jsx       # Componente del modal de login.
│   │   ├── navbar.jsx      # Barra de navegación principal.
│   │   ├── PrintButton.jsx # Componente genérico para imprimir tablas.
│   │   └── ...
│   ├── config/
│   │   └── endpoints.js    # Centraliza las URLs de la API.
│   ├── hooks/
│   │   ├── useAuth.js      # (Reemplazado por Zustand)
│   │   ├── usePago.js      # Lógica para el modal de pago.
│   │   └── use*Admin.js    # Hooks para cada sección de administración (ej: useClientesAdmin).
│   ├── pages/
│   │   ├── admin/          # Componentes que definen cada pestaña del panel de admin.
│   │   ├── carrito.jsx     # Página del carrito de compras.
│   │   └── productos.jsx   # Página que muestra la grilla de productos.
│   ├── store/
│   │   ├── authStore.js    # Store de Zustand para la sesión del usuario.
│   │   ├── carritoStore.js # Store para los items del carrito.
│   │   └── ...
│   ├── App.jsx             # Componente raíz y configuración de react-router-dom.
│   └── App.css             # Hoja de estilos principal.
```
-   **`hooks/`**: Contienen la lógica de negocio del frontend. Cada hook `use*Admin` se encarga de las llamadas a la API y el estado local para una sección del panel de administración, manteniendo los componentes "tontos" (presentacionales).
-   **`pages/`**: Componentes que representan una página o una vista completa. Son los "contenedores" que usan los hooks para obtener datos y los pasan a los componentes de `components/`.
-   **`store/`**: Define los stores globales de Zustand. `authStore` es fundamental, ya que maneja el estado de autenticación del usuario en toda la aplicación.

## 4. Flujo de Datos y Lógica Clave

-   **Autenticación**: El flujo de login es manejado por `authStore.js`. Al iniciar sesión, los datos del usuario se guardan en el `localStorage` (gracias a `zustand/middleware/persist`) y se cargan al iniciar la aplicación, manteniendo la sesión.
-   **Rutas Protegidas**: El componente `ProtectedRoute.jsx` verifica el `authStore` para determinar si un usuario está logueado y si su rol (`tipo`) está en la lista de roles permitidos para una ruta.
-   **Gestión de Administración (CRUD)**:
    1.  Cada página de administración (ej: `ClientesAdmin.jsx`) utiliza su propio custom hook (ej: `useClientesAdmin`).
    2.  El hook se encarga de las llamadas a la API (GET, POST, PUT, DELETE) y de manejar los estados de `loading` y `error`.
    3.  El componente se suscribe a los datos del hook y se re-renderiza automáticamente cuando los datos cambian (ej: después de agregar un nuevo cliente).
-   **Impresión**: El componente `PrintButton.jsx` encapsula la lógica para crear una versión imprimible de los datos. Recibe un array de datos y una configuración de columnas, genera una tabla HTML simple en un `div` oculto y usa `window.print()` para invocar el diálogo de impresión. El CSS `@media print` se encarga de mostrar solo este `div`.

---
