<?php
/**
 * Guardián de rutas (TP N.º 8).
 *
 * Uso al principio de una página protegida, ANTES de imprimir HTML:
 *
 *     $base = '';                    // '../' si la página está en una subcarpeta
 *     $rol_requerido = 'admin';      // opcional: sin esta línea basta con estar logueado
 *     require_once 'includes/auth_guard.php';
 */
require_once __DIR__ . '/session.php';

$ruta_base = isset($base) ? $base : '';

// Que el navegador no guarde copias de páginas protegidas (botón "atrás" tras cerrar sesión)
header('Cache-Control: no-store, no-cache, must-revalidate');

// 1) ¿Está autenticado?
if (!isset($_SESSION['usuario_id'])) {
    header('Location: ' . $ruta_base . 'login.php?error=acceso_denegado');
    exit;
}

// 2) ¿Tiene el rol exigido por la página?
if (isset($rol_requerido) && ($_SESSION['rol'] ?? '') !== $rol_requerido) {
    header('Location: ' . $ruta_base . 'panel.php?error=sin_permiso');
    exit;
}