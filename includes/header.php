<?php
require_once __DIR__ . '/../config/env.php';
$titulo = isset($titulo_pagina) ? $titulo_pagina . ' | ' . APP_NAME : APP_NAME;
$descripcion = $descripcion_pagina ?? 'Herme Iuris: el derecho explicado para todos.';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= htmlspecialchars($descripcion) ?>">
    <title><?= htmlspecialchars($titulo) ?></title>
    <link rel="icon" type="image/svg+xml" href="img/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/styles.css" rel="stylesheet">
</head>
<body>
<?php require_once __DIR__ . '/nav.php'; ?>
