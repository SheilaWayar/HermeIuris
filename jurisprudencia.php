<?php
$titulo_pagina = "Jurisprudencia";
require_once 'includes/header.php';

$ambito = ($_GET['ambito'] ?? 'nacional') === 'provincial' ? 'provincial' : 'nacional';
$q = trim($_GET['q'] ?? '');

$fallos = [
    'nacional' => [
        ['Corte Suprema de Justicia', 'CSJ 1235/2018', 'Hábeas Corpus Colectivo', '09/05/2026', 'Constitucional'],
        ['Cámara Nacional de Apelaciones Civil', 'CNC 508/2019', 'Daños y Perjuicios en Accidentes', '08/05/2026', 'Civil'],
        ['Cámara Nacional del Trabajo', 'CNT 897/2020', 'Teletrabajo y Equipamiento', '07/05/2026', 'Laboral'],
        ['Cámara Federal de Seguridad Social', 'CFSS 332/2017', 'Jubilación Anticipada', '06/05/2026', 'Previsional'],
        ['Cámara Nacional Comercial', 'CNCom 590/2020', 'Concursos y Quiebras', '05/05/2026', 'Comercial'],
    ],
    'provincial' => [
        ['Suprema Corte Buenos Aires', 'SCBA 308-111/2019', 'Violencia de Género y Medidas Cautelares', '09/05/2026', 'Familia'],
        ['TSJ Córdoba', 'TSJC 24-0/2018', 'Control de Locación Comercial', '08/05/2026', 'Civil'],
        ['STJ Santa Fe', 'STJSF 12-001/2020', 'Responsabilidad Municipal', '07/05/2026', 'Administrativo'],
        ['TSJ Mendoza', 'TSJM 121-404/2019', 'Derecho de Aguas', '06/05/2026', 'Ambiental'],
    ],
];
$lista = array_filter($fallos[$ambito], fn($f) => $q === '' || stripos(implode(' ', $f), $q) !== false);
?>
<main class="container py-5">
    <p class="eyebrow dark mb-1">Base de datos</p>
    <h1 class="mb-3">Jurisprudencia</h1>
    <div class="btn-group mb-3">
        <a href="?ambito=nacional" class="btn btn-sm <?= $ambito === 'nacional' ? 'btn-navy' : 'btn-outline-dark' ?>">Nacional</a>
        <a href="?ambito=provincial" class="btn btn-sm <?= $ambito === 'provincial' ? 'btn-navy' : 'btn-outline-dark' ?>">Provincial</a>
    </div>
    <form method="get" class="d-flex gap-2 mb-4" style="max-width:520px">
        <input type="hidden" name="ambito" value="<?= $ambito ?>">
        <input type="search" name="q" value="<?= htmlspecialchars($q) ?>" class="form-control" placeholder="Buscar por tema o materia...">
        <button class="btn btn-gold px-4">Buscar</button>
    </form>
    <div class="table-responsive card-ley">
        <table class="table table-ley align-middle mb-0">
            <thead><tr><th>Tribunal</th><th>Expediente</th><th>Tema</th><th>Fecha</th><th>Materia</th></tr></thead>
            <tbody>
            <?php foreach ($lista as [$tribunal, $exp, $tema, $fecha, $materia]): ?>
                <tr><td><?= $tribunal ?></td><td><?= $exp ?></td><td><?= $tema ?></td><td><?= $fecha ?></td><td><span class="tag"><?= $materia ?></span></td></tr>
            <?php endforeach; ?>
            <?php if (!$lista): ?><tr><td colspan="5" class="text-center text-secondary py-4">Sin resultados.</td></tr><?php endif; ?>
            </tbody>
        </table>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>
