<?= $this->extend('layouts/principal') ?>

<?= $this->section('contenido') ?>
<h1 class="mb-3">Cursos de Derecho</h1>

<form method="get" action="<?= site_url('cursos') ?>" class="row g-2 mb-4">
    <div class="col-sm-9">
        <input type="search" name="q" value="<?= esc($q) ?>" class="form-control"
               placeholder="Buscá por título o área (ej: civil)">
    </div>
    <div class="col-sm-3">
        <button class="btn btn-dark w-100">Buscar</button>
    </div>
</form>

<?php if (empty($cursos)): ?>
    <p class="text-secondary">No se encontraron cursos.</p>
<?php else: ?>
    <div class="row g-4">
        <?php foreach ($cursos as $c): ?>
            <div class="col-sm-6 col-lg-4">
                <div class="card h-100">
                    <?php if (!empty($c['imagen_url'])): ?>
                        <img src="<?= esc($c['imagen_url']) ?>" class="card-img-top" alt="<?= esc($c['titulo']) ?>">
                    <?php endif; ?>
                    <div class="card-body">
                        <span class="badge text-bg-secondary"><?= esc($c['area'] ?? 'General') ?></span>
                        <h2 class="fs-5 mt-2"><?= esc($c['titulo']) ?></h2>
                        <p class="small text-secondary"><?= esc($c['descripcion'] ?? '') ?></p>
                        <a href="<?= site_url('cursos/' . $c['id_curso']) ?>" class="btn btn-dark w-100">Ver curso</a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>
<?= $this->endSection() ?>