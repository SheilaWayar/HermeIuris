# Herme Iuris

**El derecho explicado para todos.**

Sitio informativo que acerca el derecho a personas sin formación jurídica: noticias y fallos explicados en lenguaje simple, glosario, cursos, jurisprudencia, foro y asistente legal.

## Refactorización a PHP (Unidad 4 – TP N° 4)

El sitio estático/React del Hito 1 fue migrado a **PHP** aplicando:

- **SSI / modularización:** `includes/header.php`, `includes/nav.php` y `includes/footer.php` incluidos con `require_once` en todas las vistas.
- **SSR básico:** el `<title>` cambia según la variable `$titulo_pagina` y el ítem activo del menú se resalta con la clase `active` (detectado con `$_SERVER['SCRIPT_NAME']`).
- **Variables de entorno:** `config/env.php` lee el archivo `.env` (excluido de Git). Se incluye `.env.example` como plantilla.
- Los datos de cada página (áreas, noticias, fallos, glosario) se renderizan desde arrays PHP en el servidor.

## Prototipo en Figma

<!-- Pegá acá el enlace público de tu diseño de Figma -->
https://www.figma.com/make/3T62CgPhX70kusOaqVlv0L/Dise%C3%B1ar-p%C3%A1gina-web-Herme-Iuris?code-node-id=0-6&p=f&t=UlQBcwz0UFaERt7s-0&fullscreen=1

## Tecnologías

HTML5 · CSS3 · Bootstrap 5 · JavaScript · PHP 8.x · XAMPP / Laragon · Git y GitHub

## Instalación y ejecución local

1. Clonar el repositorio dentro de `htdocs` (XAMPP) o `www` (Laragon):
   ```bash
   git clone https://github.com/SheilaWayar/HermeIuris.git
   ```
2. Crear el archivo de entorno a partir de la plantilla:
   ```bash
   cp .env.example .env
   ```
   y completar los valores.
3. Iniciar Apache desde XAMPP/Laragon.
4. Abrir `http://localhost/HermeIuris/` en el navegador.

## Estructura

```
├── config/env.php
├── includes/ (header.php, nav.php, footer.php)
├── css/  js/  img/
├── index.php  actualidad.php  foro.php  cuenta.php
├── cursos.php  terminologia.php  chatbot.php  jurisprudencia.php
├── .env.example
└── .gitignore
```

## Evidencia de funcionamiento

> Agregar capturas en una carpeta `capturas/` y enlazarlas aquí:
>
> - Servidor local ejecutándose (`http://localhost/...`)
> - Estructura modular (header.php, nav.php, footer.php)
> - Título dinámico en la pestaña y clase `active` en el menú
> - Archivo `.env.example` en el repositorio

⚠️ El contenido del sitio es orientativo y no constituye asesoramiento legal.
## Clase 5 – Procesamiento de Formularios y Seguridad Web

- [Ver entrega Clase 5](./clase5)
## TP N.º 6: Esquema relacional en MySQL

- [Normalización (1FN, 2FN y 3FN)](tp6/NORMALIZACION.md)
- [Script de creación del esquema](tp6/schema.sql)
- [Consultas de prueba CRUD](tp6/consultas.sql)
## TP N.º 7: Persistencia y conexión PHP-MySQL segura

CRUD de temas del foro con PDO y consultas preparadas, integrado al layout del sitio.

- Listado, alta, edición y baja: [admin/](admin/index.php)
- Conexión PDO: [config/conexion.php](config/conexion.php)
- Para correrlo: copiar `config/db_config.example.php` como `config/db_config.php` y completar la contraseña de MySQL. Antes hay que ejecutar `tp6/schema.sql` y `tp6/consultas.sql`.
## TP N.º 8: Manejo de Estado, Sesiones y Autenticación

**Materia:** Programación Web, Unidad 4 (Programación del lado servidor, PHP)
**Docente:** Lic. Gabriel Artaza
**Modalidad:** Individual
**Alumna:** [Tu nombre y apellido]

### Descripción

Módulo de autenticación integrado en la aplicación principal: registro de usuarios, inicio y cierre de sesión, protección de páginas y control de acceso por roles (`admin` / `usuario`), usando PHP, PDO y MySQL.

### Archivos del módulo

| Archivo | Función |
|---|---|
| `registro.php` | Alta de usuarios con validación estricta, verificación de correo único y contraseña hasheada |
| `login.php` | Validación de credenciales y creación de la sesión |
| `logout.php` | Cierre de sesión completo |
| `panel.php` | Página protegida para cualquier usuario autenticado |
| `admin/index.php` | Página protegida solo para el rol `admin` |
| `includes/session.php` | Inicio de sesión centralizado con cookies seguras |
| `includes/auth_guard.php` | Guardián de rutas reutilizable |
| `includes/nav.php` | Menú que cambia según haya sesión iniciada o no |
| `clase8/tp8.sql` | Script SQL con el rol por defecto y la asignación del administrador |

### Base de datos

Base: `hermeiuris`. Tablas principales del módulo:

- `roles` (`id_rol`, `nombre`, `descripcion`): contiene los roles `admin` y `usuario`.
- `usuarios` (`id_usuario`, `id_rol`, `nombre`, `apellido`, `email` único, `password_hash` VARCHAR(255), `activo`, `created_at`).

### Medidas de seguridad implementadas

- **Hashing de contraseñas:** `password_hash($password, PASSWORD_BCRYPT)` al registrar y `password_verify()` al iniciar sesión, según recomendaciones OWASP.
- **Consultas preparadas (PDO)** en todas las operaciones con la base, contra inyección SQL.
- **Prevención de XSS:** validación y saneamiento de las entradas, y escape de toda salida con `htmlspecialchars` (función `e()`).
- **Fijación de sesión:** `session_regenerate_id(true)` al autenticar.
- **Cookies de sesión seguras:** `httponly`, `samesite=Lax`, `secure` cuando hay HTTPS, `use_strict_mode` y `use_only_cookies`.
- **Datos en sesión:** `$_SESSION['usuario_id']`, `$_SESSION['usuario_nombre']` y `$_SESSION['rol']`.
- **Guardián de rutas:** si no hay sesión, redirige a `login.php?error=acceso_denegado`; si el rol no coincide, redirige a `panel.php?error=sin_permiso`.
- **Cierre de sesión:** vacía `$_SESSION`, elimina la cookie de sesión del navegador y llama a `session_destroy()`.
- **Mensaje genérico de error** en el login, para no revelar si falló el correo o la contraseña.
- **Control de caché** en páginas protegidas, para que el botón "atrás" no muestre contenido tras cerrar sesión.

### Cómo usar el guardián de rutas

Al comienzo de cualquier página protegida, antes de imprimir HTML:

    $base = '';                    // '../' si la página está en una subcarpeta
    $rol_requerido = 'admin';      // opcional: sin esta línea basta con estar logueado
    require_once 'includes/auth_guard.php';

### Instalación y prueba local

1. Instalar XAMPP, iniciar **Apache** y **MySQL** y colocar el proyecto en `C:\xampp\htdocs\hermeiuris-php`.
2. Crear la base `hermeiuris` en phpMyAdmin (cotejamiento `utf8mb4_general_ci`) e importar los scripts SQL del proyecto.
3. Copiar `config/db_config.example.php` como `config/db_config.php` y completar las credenciales (este archivo está en `.gitignore` y no se sube al repositorio).
4. Abrir `http://localhost/hermeiuris-php/registro.php`.

### Cómo probar el flujo

1. **Registro:** crear una cuenta en `registro.php`; redirige a `login.php`. Registrar el mismo correo otra vez muestra el aviso de correo ya registrado.
2. **Login:** iniciar sesión; redirige a `panel.php`.
3. **Ruta protegida:** sin sesión, abrir `panel.php` redirige a `login.php?error=acceso_denegado`.
4. **Rol admin:** para convertir una cuenta en administradora, ejecutar en phpMyAdmin el `UPDATE` de `clase8/tp8.sql` con el correo correspondiente. Un usuario común que abra `admin/index.php` es rechazado.
5. **Logout:** el botón "Cerrar sesión" destruye la sesión y vuelve al login.

### Enlaces

- Repositorio: [URL de tu repositorio en GitHub]
- Aplicación: [URL de despliegue, si corresponde]
## TP9 – Comunicación asincrónica: buscador de cursos en tiempo real

### Qué hace
La página `cursos.php` incluye un buscador que filtra los cursos mientras el usuario escribe, sin recargar la página. Busca por título del curso o por nombre del área del derecho (tablas `cursos` y `areas_derecho`).

### Cómo funciona
1. El usuario escribe en el campo de búsqueda (`#inputBusqueda`).
2. `js/buscar_cursos.js` captura el evento `input`, espera 300 ms desde la última tecla (debounce) y cancela la petición anterior si todavía estaba en curso (`AbortController`).
3. Con `fetch()` y `async/await` consulta el endpoint `api/buscar_cursos.php?q=texto`.
4. El resultado JSON se dibuja en `#resultados` creando elementos con `textContent` (no `innerHTML`), para evitar XSS.
5. Si la petición falla, un bloque `try...catch` muestra "No se pudo completar la búsqueda" sin romper la página.

### Endpoint
`GET api/buscar_cursos.php?q=<texto>`

- Respuesta: `Content-Type: application/json; charset=utf-8`
- Usa PDO con consultas preparadas.
- Ejemplo de respuesta:
```json
{
  "total": 1,
  "cursos": [
    { "id": 1, "titulo": "Introducción al Derecho Civil", "area": "Civil" }
  ]
}
```

### Códigos de estado
| Código | Cuándo |
|--------|--------|
| 200 | Búsqueda correcta (la lista puede estar vacía si no hay coincidencias) |
| 400 | Parámetro `q` inválido o de más de 100 caracteres |
| 405 | Método distinto de GET |
| 500 | Error de base de datos o de configuración |

### Cómo probarlo
1. Iniciar Apache y MySQL en XAMPP y verificar que la tabla `cursos` tenga datos.
2. Abrir en el navegador:
   - `http://localhost/hermeiuris-php/api/buscar_cursos.php` → JSON con todos los cursos.
   - `http://localhost/hermeiuris-php/api/buscar_cursos.php?q=civil` → JSON filtrado.
   - `http://localhost/hermeiuris-php/api/buscar_cursos.php?q[]=x` → error 400.
3. Abrir `http://localhost/hermeiuris-php/cursos.php`, escribir en el buscador y observar en F12 → Network las peticiones `buscar_cursos.php?q=...` con estado 200.
4. Detener MySQL y escribir en el buscador: debe aparecer el mensaje de error en rojo.

### Archivos del TP
- `api/buscar_cursos.php` – endpoint JSON
- `js/buscar_cursos.js` – frontend (Fetch API y renderizado del DOM)
- `cursos.php` – página con el buscador
## TP10 – Refactorización a MVC y módulo con framework

### Parte A: MVC nativo (PHP puro)
Se refactorizó el módulo de cursos separando responsabilidades:
- `app/Models/Database.php` y `app/Models/Curso.php`: conexión PDO y consultas SQL con Prepared Statements.
- `app/Controllers/CursoController.php`: recibe la solicitud, usa el modelo y elige la vista (`index`, `detalle`, `api`).
- `app/Views/cursos/`: vistas con el HTML (`index.php`, `detalle.php`).
- `cursos.php`, `curso.php` y `api/buscar_cursos.php`: puntos de entrada que solo llaman al controlador.

### Parte B: módulo en CodeIgniter 4
Carpeta `hermeiuris-ci4/`. Módulo independiente de cursos:
- Rutas (`app/Config/Routes.php`): `GET /cursos`, `GET /cursos/{id}`, `GET /api/cursos`.
- Controlador: `app/Controllers/Cursos.php`.
- Modelo con Query Builder: `app/Models/CursoModel.php`.
- Vistas con layout: `app/Views/layouts/principal.php`, `app/Views/cursos/index.php` y `ver.php`.
- API REST simple: `GET /api/cursos?q=texto` devuelve JSON.

### Cómo ejecutarlo
**Parte A:** copiar el proyecto en `htdocs` de XAMPP, iniciar Apache y MySQL, crear `config/db_config.php` con los datos de la base y abrir `http://localhost/hermeiuris-php/cursos.php`.

**Parte B:**
1. Requiere **PHP 8.2 o superior** (CodeIgniter 4.7) con las extensiones `intl`, `mbstring` y `mysqli` habilitadas.
2. Copiar `hermeiuris-ci4/env` a `hermeiuris-ci4/.env` y completar los datos de la base.
3. Iniciar MySQL.
4. Desde `hermeiuris-ci4/`: `php spark serve` y abrir `http://localhost:8080/cursos`.

### Despliegue
https://hermeiuris.infinityfreeapp.com