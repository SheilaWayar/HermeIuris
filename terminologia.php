<?php
$titulo_pagina = "Glosario Jurídico";
require_once 'includes/header.php';

$glosario = [
    'Acción' => 'Derecho de acudir ante un juez para pedir protección.',
    'Allanamiento' => 'Ingreso autorizado por un juez a un domicilio.',
    'Cautelar' => 'Medida preventiva para proteger un derecho.',
    'Demanda' => 'Escrito que inicia un proceso judicial.',
    'Fuero' => 'Jurisdicción competente según la materia.',
    'Hábeas Corpus' => 'Garantía para proteger la libertad personal.',
    'Indagatoria' => 'Declaración del imputado ante el juez.',
    'Jurisprudencia' => 'Conjunto de fallos que interpreta las leyes.',
    'Prescripción' => 'Extinción de una acción por el paso del tiempo.',
];
?>
<main class="container py-5">
    <p class="eyebrow dark mb-1">Referencia</p>
    <h1 class="mb-1">Glosario Jurídico</h1>
    <p class="text-secondary mb-3">Terminología legal explicada en palabras simples.</p>
    <input type="search" id="buscar-termino" class="form-control mb-4" style="max-width:420px" placeholder="Buscar término jurídico...">
    <div class="row g-3">
        <?php foreach ($glosario as $termino => $def): ?>
            <div class="col-md-6 col-lg-4">
                <div class="glosario-item" data-termino="<?= $termino ?>">
                    <strong><?= $termino ?></strong>
                    <p class="small text-secondary mb-0"><?= $def ?></p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>
