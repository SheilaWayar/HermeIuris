<?php
/**
 * Inicio de sesión centralizado (TP N.º 8).
 * Se incluye desde includes/header.php y desde auth_guard.php, así que puede cargarse
 * varias veces: session_start() solo se ejecuta si todavía no hay sesión activa.
 * Debe cargarse ANTES de imprimir cualquier HTML.
 */
require_once __DIR__ . '/helpers.php';

if (session_status() === PHP_SESSION_NONE) {
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

    ini_set('session.use_strict_mode', '1');   // rechaza IDs de sesión que el servidor no generó
    ini_set('session.use_only_cookies', '1');  // nunca aceptar el ID por la URL

    session_set_cookie_params([
        'lifetime' => 0,          // la cookie muere al cerrar el navegador
        'path'     => '/',
        'domain'   => '',
        'secure'   => $https,     // solo por HTTPS cuando el sitio esté en HTTPS
        'httponly' => true,       // JavaScript no puede leer la cookie (mitiga XSS)
        'samesite' => 'Lax',      // no se envía en POST desde otros sitios (mitiga CSRF)
    ]);

    session_start();
}

/** ¿Hay un usuario autenticado? */
function usuario_logueado(): bool
{
    return isset($_SESSION['usuario_id']);
}

/** Rol del usuario autenticado ('admin', 'usuario') o null. */
function rol_actual(): ?string
{
    return $_SESSION['rol'] ?? null;
}