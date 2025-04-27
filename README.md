# API de Social Media

## Descripción

API RESTful para una plataforma de redes sociales desarrollada con NestJS, TypeORM y PostgreSQL. Esta API proporciona todas las funcionalidades esenciales para gestionar usuarios, publicaciones, likes y autenticación en una red social moderna.

## Características Principales

- **Autenticación Segura**: Sistema completo de registro e inicio de sesión con JWT
- **Gestión de Usuarios**: Registro, perfil, y roles (usuario, admin, super_admin)
- **Publicaciones**: Crear, editar, eliminar y listar publicaciones con soporte para imágenes
- **Sistema de Likes**: Implementación escalable de likes con relaciones optimizadas
- **Seguridad**: Protección de rutas mediante guards de autenticación y roles
- **Base de Datos**: Estructura relacional optimizada con TypeORM y PostgreSQL

## Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL
- pnpm (recomendado) o npm

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/social-media-api.git
cd social-media-api

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus configuraciones

# Ejecutar migraciones
pnpm migration:run

# Iniciar en modo desarrollo
pnpm start:dev
```

## Estructura de la Base de Datos

La API utiliza una estructura de base de datos relacional:

- **Users**: Almacena información de usuarios, credenciales y roles
- **Posts**: Contiene las publicaciones de los usuarios con soporte para contenido e imágenes
- **Likes**: Sistema escalable para gestionar las interacciones de "me gusta" entre usuarios y publicaciones

## Endpoints

### Autenticación

- `POST /auth/register` - Registro de nuevo usuario
- `POST /auth/login` - Inicio de sesión y obtención de token JWT

### Usuarios

- `GET /users` - Obtener lista de usuarios
- `GET /users/:id` - Obtener información de un usuario específico
- `PATCH /users/:id` - Actualizar información de usuario
- `DELETE /users/:id` - Eliminar usuario

### Publicaciones

- `POST /posts` - Crear nueva publicación
- `GET /posts` - Obtener lista de publicaciones con paginación
- `GET /posts/:id` - Obtener una publicación específica
- `PATCH /posts/:id` - Actualizar una publicación
- `DELETE /posts/:id` - Eliminar una publicación

### Sistema de Likes

- `POST /likes/create` - Dar "me gusta" a una publicación
- `DELETE /likes/post/:postId` - Quitar "me gusta" de una publicación
- `GET /likes/post/:postId` - Obtener todos los likes de una publicación
- `GET /likes/user/:userId` - Obtener todos los likes dados por un usuario
- `GET /likes/post/count/:postId` - Contar el número de likes de una publicación
- `GET /likes/check/:postId` - Verificar si el usuario actual ha dado like a una publicación

## Seguridad

La API implementa múltiples capas de seguridad:

- Autenticación basada en tokens JWT
- Protección de rutas mediante guards personalizados
- Validación de datos de entrada con class-validator
- Sistema de roles para control granular de acceso
- Encriptación de contraseñas con bcrypt

## Arquitectura

El proyecto sigue una arquitectura modular basada en los principios de NestJS:

- **Módulos**: Organizan el código en unidades cohesivas (auth, users, posts, likes)
- **Controladores**: Manejan las solicitudes HTTP y delegan la lógica de negocio
- **Servicios**: Contienen la lógica de negocio principal
- **Entidades**: Definen el esquema de la base de datos
- **DTOs**: Validan los datos de entrada
- **Guards**: Protegen las rutas según los requisitos de autenticación y autorización
- **Decoradores**: Facilitan el acceso a datos comunes como el usuario actual

## Sistema de Likes Escalable

El sistema de likes se ha diseñado para ser altamente escalable:

- Tabla independiente para almacenar los likes
- Relaciones optimizadas entre usuarios, publicaciones y likes
- Índices compuestos para prevenir duplicados (un usuario solo puede dar like una vez a cada publicación)
- Endpoints eficientes para contar y verificar likes
- Soporte para análisis de patrones de interacción

## Scripts Disponibles

```bash
# Desarrollo
pnpm start:dev

# Producción
pnpm build
pnpm start:prod

# Migraciones de base de datos
pnpm migration:generate -- src/database/migrations/NombreMigracion
pnpm migration:run
pnpm migration:revert

# Tests
pnpm test
pnpm test:e2e
```

## Contribución

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Hacer commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Hacer push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abrir un Pull Request

## Licencia

Este proyecto está licenciado bajo [LICENCIA] - ver el archivo LICENSE para más detalles.
