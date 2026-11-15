<?php
require_once __DIR__ . '/../config/env.php';
// $base: prefijo de rutas. '' en la raíz del sitio, '../' dentro de /clase5
$base = $base ?? '';
$titulo = isset($titulo_pagina) ? $titulo_pagina . ' | ' . APP_NAME : APP_NAME;
$descripcion = $descripcion_pagina ?? 'Herme Iuris: el derecho explicado para todos.';
?>
<!DOCTYPE html>
<html lang="es" data-theme="dark" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= htmlspecialchars($descripcion) ?>">
    <title><?= htmlspecialchars($titulo) ?></title>
    <script>
        // Aplica el tema guardado antes de pintar la página (evita el "parpadeo")
        // data-theme lo usa styles.css; data-bs-theme hace que Bootstrap (tablas, inputs, etc.) siga al tema
        try {
            var t = localStorage.getItem('tema') || 'dark';
            document.documentElement.setAttribute('data-theme', t);
            document.documentElement.setAttribute('data-bs-theme', t);
        } catch (e) {}
    </script>
    <link rel="icon" type="image/svg+xml" href="<?= $base ?>img/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?= $base ?>css/styles.css" rel="stylesheet">
</head>
<body>
<?php require_once __DIR__ . '/nav.php'; ?>