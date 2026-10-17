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

https://www.figma.com/make/3T62CgPhX70kusOaqVlv0L/Dise%C3%B1ar-p%C3%A1gina-web-Herme-Iuris?code-node-id=0-6&p=f&t=c7JDBfcsoTWABt1R-0&fullscreen=1

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

### Servidor local ejecutándose
![Servidor local](capturas/01-localhost.png)

### Estructura modular (SSI)
![Includes](capturas/02-includes.png)

### Navegación dinámica (título y menú activo)
![Título y menú](capturas/03-titulo-menu.png)

### Variables de entorno
![.env.example](capturas/04-env-example.png)