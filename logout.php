<?php
// LOGOUT: registra el evento y destruye la sesión por completo
require_once __DIR__ . '/config/conexion.php';
require_once __DIR__ . '/includes/session.php';
require_once __DIR__ . '/includes/historial.php';

// 0) Dejar constancia en el historial (antes de vaciar la sesión)
if (usuario_logueado()) {
    registrar_evento($pdo, (int) $_SESSION['usuario_id'], 'logout');
}

// 1) Vaciar las variables de sesión
$_SESSION = [];

// 2) Eliminar la cookie de sesión del navegador
if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires'  => time() - 42000,
        'path'     => $p['path'],
        'domain'   => $p['domain'],
        'secure'   => $p['secure'],
        'httponly' => $p['httponly'],
        'samesite' => $p['samesite'] ?? 'Lax',
    ]);
}

// 3) Destruir la sesión en el servidor
session_destroy();

header('Location: login.php?status=logout');
exit;