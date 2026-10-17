<?php
$titulo_pagina = "Cursos";
require_once 'includes/header.php';

$cursos = [
    ['Introducción al Derecho para No Abogados', 'Básico', '4 h', 5, 'photo-1589829545856-d10d557cf95f'],
    ['Tus Derechos como Consumidor', 'Básico', '3 h', 4, 'photo-1556742049-0cfed4f6a45d'],
    ['Derecho Laboral: Conocé tus Derechos', 'Intermedio', '6 h', 8, 'photo-1521791136064-7986c2920216'],
    ['Cómo Leer un Contrato', 'Intermedio', '5 h', 6, 'photo-1507679799987-c73779587ccf'],
    ['Familia y Derecho: Separación y Herencias', 'Intermedio', '6 h', 7, 'photo-1511895426328-dc8714191011'],
    ['Derecho Digital y Datos Personales', 'Avanzado', '8 h', 10, 'photo-1550751827-4bd374c3f58b'],
];
?>
<main class="container py-5">
    <p class="eyebrow dark mb-1">Formación</p>
    <h1 class="mb-1">Cursos de Derecho</h1>
    <p class="text-secondary mb-4">Aprendé sobre tus derechos con contenido simple, claro y gratuito.</p>
    <div class="row g-4">
        <?php foreach ($cursos as [$titulo, $nivel, $horas, $clases, $img]): ?>
            <div class="col-sm-6 col-lg-4">
                <div class="card-ley overflow-hidden">
                    <img class="course-img" src="https://images.unsplash.com/<?= $img ?>?w=500" alt="<?= $titulo ?>" loading="lazy">
                    <div class="p-3">
                        <span class="tag"><?= $nivel ?></span>
                        <h2 class="fs-5 mt-2"><?= $titulo ?></h2>
                        <p class="small text-secondary">🕐 <?= $horas ?> · <?= $clases ?> clases</p>
                        <a href="#" class="btn btn-navy w-100">Ver curso</a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>
