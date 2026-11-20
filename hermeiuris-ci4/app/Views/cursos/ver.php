<?= $this->extend('layouts/principal') ?>

<?= $this->section('contenido') ?>
<a href="<?= site_url('cursos') ?>" class="small">← Volver a cursos</a>

<div class="row g-4 mt-1">
    <?php if (!empty($curso['imagen_url'])): ?>
        <div class="col-lg-6">
            <img class="img-fluid rounded" src="<?= esc($curso['imagen_url']) ?>" alt="<?= esc($curso['titulo']) ?>">
        </div>
    <?php endif; ?>
    <div class="col-lg-6">
        <span class="badge text-bg-secondary"><?= esc($curso['area'] ?? 'General') ?></span>
        <h1 class="mt-2"><?= esc($curso['titulo']) ?></h1>
        <p class="text-secondary"><?= esc($curso['descripcion'] ?? '') ?></p>
    </div>
</div>
<?= $this->endSection() ?>