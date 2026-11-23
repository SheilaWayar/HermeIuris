<?php
$base = '../';
$titulo_pagina = 'Clase 5';
require_once __DIR__ . '/../includes/header.php';
?>

<main class="container py-5">
    <p class="eyebrow mb-1">Programación Web · TP N.º 5</p>
    <h1 class="mb-3">Procesamiento de formularios y seguridad web</h1>
    <p class="text-muted mb-4">Captura y validación de datos en el servidor (PHP) con sanitización contra XSS.</p>
    <div class="row g-3">
        <div class="col-md-6">
            <a class="card-ley p-4 d-block text-decoration-none" href="contacto.php">
                <h2 class="h4">Formulario de contacto</h2>
                <p class="text-muted mb-0">Envío por método <strong>POST</strong>.</p>
            </a>
        </div>
        <div class="col-md-6">
            <a class="card-ley p-4 d-block text-decoration-none" href="buscar.php">
                <h2 class="h4">Buscador de contenidos</h2>
                <p class="text-muted mb-0">Envío por método <strong>GET</strong>.</p>
            </a>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>