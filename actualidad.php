<?php
$titulo_pagina = "Actualidad";
require_once 'includes/header.php';

$noticias = [
    ['Constitucional', '10 may 2026', 'La Corte Suprema amplió el alcance del hábeas corpus colectivo',
     'El máximo tribunal resolvió que el hábeas corpus colectivo procede cuando afecta a grupos vulnerables.',
     'En términos simples: ahora un grupo de personas en una misma situación puede pedir protección en un solo reclamo.'],
    ['Laboral', '08 may 2026', 'Nuevo criterio sobre teletrabajo y desconexión digital',
     'Un tribunal laboral fijó pautas sobre horarios y derecho a desconectarse.',
     'En términos simples: tu empleador no puede exigirte responder mensajes fuera de tu jornada.'],
    ['Civil', '03 may 2026', 'Alquileres: precisan quién paga las expensas extraordinarias',
     'La Cámara Civil aclaró la responsabilidad entre propietario e inquilino.',
     'En términos simples: las obras grandes suelen corresponder al propietario.'],
];
$destacados = ['Constitucional' => 8, 'Civil' => 12, 'Laboral' => 9, 'Familia' => 7, 'Comercial' => 5];
?>
<main class="container py-5">
    <p class="eyebrow dark mb-1">Actualidad legal</p>
    <h1 class="mb-1">Fallos y Noticias Recientes</h1>
    <p class="text-secondary mb-4">Análisis jurídico accesible sobre los fallos y debates más importantes del momento.</p>
    <div class="row g-4">
        <div class="col-lg-8">
            <?php foreach ($noticias as $i => [$cat, $fecha, $titulo, $resumen, $analisis]): ?>
                <article class="card-ley p-4 mb-3 h-auto">
                    <span class="tag"><?= $cat ?></span> <small class="text-secondary ms-2"><?= $fecha ?></small>
                    <h2 class="fs-4 mt-2"><?= $titulo ?></h2>
                    <p class="text-secondary"><?= $resumen ?></p>
                    <button class="btn btn-link p-0 fw-semibold" style="color:var(--navy)" data-bs-toggle="collapse" data-bs-target="#analisis<?= $i ?>">▾ Ver análisis jurídico</button>
                    <div class="collapse mt-2" id="analisis<?= $i ?>"><div class="p-3 bg-light rounded small"><?= $analisis ?></div></div>
                </article>
            <?php endforeach; ?>
        </div>
        <aside class="col-lg-4">
            <div class="card-ley p-4 mb-3 h-auto">
                <h2 class="fs-5">Temas destacados</h2>
                <ul class="list-unstyled mb-0">
                    <?php foreach ($destacados as $tema => $n): ?>
                        <li class="d-flex justify-content-between border-bottom py-2 small"><span><?= $tema ?></span><span style="color:var(--gold-text)"><?= $n ?> fallos</span></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="aside-consulta">
                <h2 class="fs-5">¿Tenés dudas sobre un fallo?</h2>
                <p class="small opacity-75">Nuestro chatbot legal puede darte una explicación simple.</p>
                <a href="chatbot.php" class="btn btn-gold">Consultar ahora →</a>
            </div>
        </aside>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>
