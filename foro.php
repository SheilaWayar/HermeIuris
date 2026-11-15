<?php
$titulo_pagina = "Foro";
require_once 'includes/header.php';

$categorias = ['Todas', 'Civil', 'Laboral', 'Familia', 'Comercial', 'Administrativo', 'Constitucional'];
$debates = [
    ['Laboral', '¿Puede una empresa despedir a un empleado por publicaciones en redes sociales?', 23],
    ['Civil', 'Alquiler: ¿el propietario puede romper sin permiso?', 41],
    ['Familia', 'Menores y redes sociales: ¿responsabilidad de los padres?', 17],
    ['Comercial', '¿Cuándo un contrato verbal tiene validez legal?', 55],
];
?>
<main class="container py-5">
    <div class="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
        <div>
            <p class="eyebrow dark mb-1">Comunidad</p>
            <h1>Foro General</h1>
            <p class="text-secondary mb-0">Debatí, preguntá y compartí tu perspectiva sobre el derecho y la justicia.</p>
        </div>
        <a href="#" class="btn btn-navy">+ Nueva tema</a>
    </div>
    <div class="d-flex flex-wrap gap-2 mb-4">
        <?php foreach ($categorias as $i => $c): ?>
            <button class="btn btn-sm btn-outline-dark rounded-pill <?= $i === 0 ? 'active' : '' ?>" data-filtro="<?= $c ?>"><?= $c ?></button>
        <?php endforeach; ?>
    </div>
    <div class="row g-4">
        <div class="col-lg-8">
            <?php foreach ($debates as [$cat, $titulo, $resp]): ?>
                <div class="card-ley p-3 mb-2 h-auto d-flex flex-row justify-content-between align-items-center" data-categoria="<?= $cat ?>">
                    <div><span class="tag"><?= $cat ?></span><p class="mb-0 mt-1 fw-semibold"><?= $titulo ?></p></div>
                    <div class="text-center"><strong><?= $resp ?></strong><br><small class="text-secondary">respuestas</small></div>
                </div>
            <?php endforeach; ?>
        </div>
        <aside class="col-lg-4">
            <div class="card-ley p-4 h-auto">
                <h2 class="fs-5">Estadísticas</h2>
                <p class="small mb-1">Usuarios activos: <strong>1.247</strong></p>
                <p class="small mb-1">Debates abiertos: <strong>89</strong></p>
                <p class="small mb-3">Respuestas hoy: <strong>334</strong></p>
                <h2 class="fs-6">Reglas del foro</h2>
                <ul class="small mb-0 ps-3"><li>Respetá a los demás</li><li>Sin asesoramiento legal individual</li><li>Citá fuentes</li><li>No publiques datos personales</li></ul>
            </div>
        </aside>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>
