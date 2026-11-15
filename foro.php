<?php
require_once __DIR__ . '/config/conexion.php';
require_once __DIR__ . '/includes/helpers.php';

// Categorías para los botones de filtro (desde la base)
$stmt = $pdo->prepare('SELECT nombre FROM categorias_foro ORDER BY nombre');
$stmt->execute();
$categorias = array_merge(['Todas'], array_column($stmt->fetchAll(), 'nombre'));

// Temas con su categoría y la cantidad de respuestas
$stmt = $pdo->prepare(
    'SELECT t.id_tema, t.titulo, c.nombre AS categoria, COUNT(r.id_respuesta) AS respuestas
     FROM temas_foro t
     INNER JOIN categorias_foro c ON c.id_categoria = t.id_categoria
     LEFT JOIN respuestas_foro r ON r.id_tema = t.id_tema
     GROUP BY t.id_tema, t.titulo, c.nombre, t.created_at
     ORDER BY t.created_at DESC, t.id_tema DESC'
);
$stmt->execute();
$debates = $stmt->fetchAll();

// Estadísticas reales
$stmt = $pdo->prepare('SELECT COUNT(*) FROM usuarios WHERE activo = :activo');
$stmt->execute([':activo' => 1]);
$usuarios_activos = (int) $stmt->fetchColumn();

$stmt = $pdo->prepare('SELECT COUNT(*) FROM temas_foro WHERE estado = :estado');
$stmt->execute([':estado' => 'abierto']);
$debates_abiertos = (int) $stmt->fetchColumn();

$stmt = $pdo->prepare('SELECT COUNT(*) FROM respuestas_foro WHERE DATE(created_at) = CURDATE()');
$stmt->execute();
$respuestas_hoy = (int) $stmt->fetchColumn();

$titulo_pagina = "Foro";
require_once 'includes/header.php';
?>
<main class="container py-5">
    <div class="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
        <div>
            <p class="eyebrow dark mb-1">Comunidad</p>
            <h1>Foro General</h1>
            <p class="text-secondary mb-0">Debatí, preguntá y compartí tu perspectiva sobre el derecho y la justicia.</p>
        </div>
        <a href="<?= $base ?>admin/crear.php" class="btn btn-navy">+ Nuevo tema</a>
    </div>
    <div class="d-flex flex-wrap gap-2 mb-4">
        <?php foreach ($categorias as $i => $c): ?>
            <button class="btn btn-sm btn-outline-dark rounded-pill <?= $i === 0 ? 'active' : '' ?>" data-filtro="<?= e($c) ?>"><?= e($c) ?></button>
        <?php endforeach; ?>
    </div>
    <div class="row g-4">
        <div class="col-lg-8">
            <?php if (!$debates): ?>
                <p class="text-secondary">Todavía no hay temas. ¡Creá el primero!</p>
            <?php endif; ?>
            <?php foreach ($debates as $d): ?>
                <div class="card-ley p-3 mb-2 h-auto d-flex flex-row justify-content-between align-items-center" data-categoria="<?= e($d['categoria']) ?>">
                    <div><span class="tag"><?= e($d['categoria']) ?></span><p class="mb-0 mt-1 fw-semibold"><?= e($d['titulo']) ?></p></div>
                    <div class="text-center"><strong><?= (int) $d['respuestas'] ?></strong><br><small class="text-secondary">respuestas</small></div>
                </div>
            <?php endforeach; ?>
        </div>
        <aside class="col-lg-4">
            <div class="card-ley p-4 h-auto">
                <h2 class="fs-5">Estadísticas</h2>
                <p class="small mb-1">Usuarios activos: <strong><?= $usuarios_activos ?></strong></p>
                <p class="small mb-1">Debates abiertos: <strong><?= $debates_abiertos ?></strong></p>
                <p class="small mb-3">Respuestas hoy: <strong><?= $respuestas_hoy ?></strong></p>
                <h2 class="fs-6">Reglas del foro</h2>
                <ul class="small mb-0 ps-3"><li>Respetá a los demás</li><li>Sin asesoramiento legal individual</li><li>Citá fuentes</li><li>No publiques datos personales</li></ul>
            </div>
        </aside>
    </div>
</main>