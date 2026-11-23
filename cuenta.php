<?php
// Sesión centralizada (TP8): define usuario_logueado(), rol_actual() y e()
require_once __DIR__ . '/includes/session.php';

$titulo_pagina = "Mi Cuenta";
require_once 'includes/header.php';

// Datos de ejemplo del panel (se muestran solo con sesión iniciada)
$stats = ['Participaciones en foro' => 23, 'Comentarios en noticias' => 41, 'Cursos iniciados' => 3, 'Cursos completados' => 1];
$config = ['Notificaciones por email', 'Alertas de nuevos fallos', 'Resumen semanal'];
?>
<main class="container py-5">
    <div class="row g-4">

        <!-- Columna izquierda: ingreso / registro, o datos de la sesión -->
        <div class="col-lg-4">
            <div class="card-ley overflow-hidden h-auto">
                <div class="p-3 text-white" style="background:var(--navy)"><h2 class="fs-5 mb-0">Mi Cuenta</h2></div>
                <div class="p-3">

                <?php if (usuario_logueado()): ?>
                    <p class="mb-1">Hola, <strong><?= e($_SESSION['usuario_nombre']) ?></strong>.</p>
                    <p class="small mb-3">Rol: <span class="tag"><?= e($_SESSION['rol']) ?></span></p>
                    <div class="d-grid gap-2">
                        <a href="panel.php" class="btn btn-navy py-2">Ir a mi panel</a>
                        <?php if (rol_actual() === 'admin'): ?>
                            <a href="admin/index.php" class="btn btn-gold py-2">Administración</a>
                        <?php endif; ?>
                        <a href="logout.php" class="btn btn-outline-secondary py-2">Cerrar sesión</a>
                    </div>

                <?php else: ?>
                    <ul class="nav nav-pills nav-fill mb-3" role="tablist">
                        <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#tab-ingresar" type="button">Ingresar</button></li>
                        <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#tab-registro" type="button">Registrarse</button></li>
                    </ul>
                    <div class="tab-content">

                        <!-- INGRESAR: envía a login.php -->
                        <form class="tab-pane fade show active d-grid gap-2" id="tab-ingresar" method="post" action="login.php">
                            <input class="form-control" type="email" name="email" maxlength="120"
                                   placeholder="Correo electrónico" aria-label="Correo electrónico"
                                   autocomplete="email" required>
                            <input class="form-control" type="password" name="password" maxlength="72"
                                   placeholder="Contraseña" aria-label="Contraseña"
                                   autocomplete="current-password" required>
                            <button type="submit" class="btn btn-navy">Acceder</button>
                            <a href="#" class="small text-center">¿Olvidaste tu contraseña?</a>
                        </form>

                        <!-- REGISTRARSE: envía a registro.php -->
                        <form class="tab-pane fade d-grid gap-2" id="tab-registro" method="post" action="registro.php">
                            <input class="form-control" type="text" name="nombre" maxlength="60"
                                   placeholder="Nombre" aria-label="Nombre" required>
                            <input class="form-control" type="text" name="apellido" maxlength="60"
                                   placeholder="Apellido" aria-label="Apellido" required>
                            <input class="form-control" type="email" name="email" maxlength="120"
                                   placeholder="Correo electrónico" aria-label="Correo electrónico"
                                   autocomplete="email" required>
                            <input class="form-control" type="password" name="password"
                                   minlength="8" maxlength="72"
                                   placeholder="Contraseña (8 o más, con letra y número)" aria-label="Contraseña"
                                   autocomplete="new-password" required>
                            <input class="form-control" type="password" name="confirmar"
                                   minlength="8" maxlength="72"
                                   placeholder="Repetí la contraseña" aria-label="Repetí la contraseña"
                                   autocomplete="new-password" required>
                            <button type="submit" class="btn btn-navy">Crear cuenta</button>
                        </form>
                    </div>
                <?php endif; ?>

                </div>
            </div>
        </div>

        <!-- Columna derecha -->
        <div class="col-lg-8">
            <?php if (usuario_logueado()): ?>
                <div class="d-flex align-items-center gap-3 mb-4">
                    <span class="logo-h" style="width:64px;height:64px;font-size:1.6rem;border-radius:50%"><?= e(mb_substr($_SESSION['usuario_nombre'], 0, 1)) ?></span>
                    <div>
                        <h1 class="fs-3 mb-0"><?= e($_SESSION['usuario_nombre']) ?></h1>
                        <small class="text-secondary">Rol: <?= e($_SESSION['rol']) ?></small>
                    </div>
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

            <?php else: ?>
                <div class="card-ley p-4 h-auto">
                    <h1 class="fs-3 mb-3">Tu espacio en <?= htmlspecialchars(APP_NAME) ?></h1>
                    <p class="mb-3">Con tu cuenta podés:</p>
                    <ul class="mb-0">
                        <li>Participar en el foro de debate.</li>
                        <li>Comentar las noticias de actualidad.</li>
                        <li>Seguir tu avance en los cursos gratuitos.</li>
                        <li>Recibir alertas de nuevos fallos.</li>
                    </ul>
                </div>
            <?php endif; ?>
        </div>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>