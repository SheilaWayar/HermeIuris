<?php
$imagenDefecto = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900';
require_once __DIR__ . '/../../../includes/header.php';
?>
<main class="container py-5">
    <a href="cursos.php" class="small">← Volver a cursos</a>

    <?php if ($errorBd): ?>
        <p class="text-danger mt-4">No se pudo cargar el curso. Intentá de nuevo más tarde.</p>
    <?php elseif (!$curso): ?>
        <h1 class="mt-4">Curso no encontrado</h1>
        <p class="text-secondary">El curso que buscás no existe o no está disponible.</p>
    <?php else: ?>
        <div class="row g-4 mt-1">
            <div class="col-lg-6">
                <img class="img-fluid rounded"
                     src="<?= htmlspecialchars($curso['imagen_url'] ?: $imagenDefecto) ?>"
                     alt="<?= htmlspecialchars($curso['titulo']) ?>">
            </div>
            <div class="col-lg-6">
                <span class="tag"><?= htmlspecialchars($curso['area'] ?? 'General') ?></span>
                <h1 class="mt-2 mb-3"><?= htmlspecialchars($curso['titulo']) ?></h1>
                <p class="text-secondary">
                    <?= nl2br(htmlspecialchars($curso['descripcion'] ?: 'Pronto vas a encontrar acá la descripción completa de este curso.')) ?>
                </p>
            </div>
        </div>
    <?php endif; ?>
</main>
<?php require_once __DIR__ . '/../../../includes/footer.php'; ?>