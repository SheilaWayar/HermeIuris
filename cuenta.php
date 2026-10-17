<?php
$titulo_pagina = "Mi Cuenta";
require_once 'includes/header.php';

$usuario = ['nombre' => 'María González', 'email' => 'maria.gonzalez@email.com', 'desde' => 'enero 2026'];
$stats = ['Participaciones en foro' => 23, 'Comentarios en noticias' => 41, 'Cursos iniciados' => 3, 'Cursos completados' => 1];
$config = ['Notificaciones por email', 'Alertas de nuevos fallos', 'Resumen semanal'];
?>
<main class="container py-5">
    <div class="row g-4">
        <div class="col-lg-4">
            <div class="card-ley overflow-hidden h-auto">
                <div class="p-3 text-white" style="background:var(--navy)"><h2 class="fs-5 mb-0">Mi Cuenta</h2></div>
                <div class="p-3">
                    <ul class="nav nav-pills nav-fill mb-3" role="tablist">
                        <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#tab-ingresar">Ingresar</button></li>
                        <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#tab-registro">Registrarse</button></li>
                    </ul>
                    <div class="tab-content">
                        <form class="tab-pane fade show active d-grid gap-2" id="tab-ingresar">
                            <input class="form-control" placeholder="Email o teléfono">
                            <input class="form-control" type="password" placeholder="Contraseña">
                            <button type="button" class="btn btn-navy">Acceder</button>
                            <a href="#" class="small text-center">¿Olvidaste tu contraseña?</a>
                        </form>
                        <form class="tab-pane fade d-grid gap-2" id="tab-registro">
                            <input class="form-control" placeholder="Nombre completo">
                            <input class="form-control" type="email" placeholder="Email">
                            <input class="form-control" type="password" placeholder="Contraseña">
                            <button type="button" class="btn btn-navy">Crear cuenta</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="d-flex align-items-center gap-3 mb-4">
                <span class="logo-h" style="width:64px;height:64px;font-size:1.6rem;border-radius:50%"><?= mb_substr($usuario['nombre'], 0, 1) ?></span>
                <div><h1 class="fs-3 mb-0"><?= $usuario['nombre'] ?></h1><small class="text-secondary"><?= $usuario['email'] ?> · Miembro desde <?= $usuario['desde'] ?></small></div>
            </div>
            <div class="row g-3 mb-4">
                <?php foreach ($stats as $label => $n): ?>
                    <div class="col-6"><div class="card-ley p-3 h-auto"><div class="fs-2 fw-bold"><?= $n ?></div><small class="text-secondary"><?= $label ?></small></div></div>
                <?php endforeach; ?>
            </div>
            <div class="card-ley p-4 h-auto">
                <h2 class="fs-5">Configuración</h2>
                <?php foreach ($config as $c): ?>
                    <div class="form-check form-switch py-1"><input class="form-check-input" type="checkbox" checked id="<?= md5($c) ?>"><label class="form-check-label" for="<?= md5($c) ?>"><?= $c ?></label></div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>
