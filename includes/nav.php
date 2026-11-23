<?php
require_once __DIR__ . '/session.php';   // define usuario_logueado() y rol_actual()

// Página actual detectada automáticamente (ej: "index.php")
$base = $base ?? '';
$pagina_actual = basename($_SERVER['SCRIPT_NAME']);
$menu = [
    'index.php'      => 'Home',
    'actualidad.php' => 'Actualidad',
    'foro.php'       => 'Foro',
    'cuenta.php'     => 'Mi Cuenta',
];

// Ingresar y Registrarme viven dentro de "Mi Cuenta" (cuenta.php),
// por eso ya no aparecen en el menú. Con sesión iniciada se agregan los accesos de usuario.
if (usuario_logueado()) {
    $menu['panel.php'] = 'Mi panel';
    if (rol_actual() === 'admin') {
        $menu['admin/index.php'] = 'Administración';
    }
    $menu['logout.php'] = 'Cerrar sesión';
}
?>
<header class="site-header sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="<?= $base ?>index.php">
                <span class="logo-h">H</span>
                <span class="brand-name"><?= htmlspecialchars(APP_NAME) ?></span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="menuPrincipal">
                <ul class="navbar-nav gap-lg-1 align-items-lg-center">
                    <?php foreach ($menu as $archivo => $texto): ?>
                        <li class="nav-item">
                            <a class="nav-link <?= $pagina_actual === basename($archivo) ? 'active' : '' ?>"
                               href="<?= $base . $archivo ?>"
                               <?= $pagina_actual === basename($archivo) ? 'aria-current="page"' : '' ?>>
                                <?= htmlspecialchars($texto) ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                    <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
                        <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Cambiar entre tema claro y oscuro">
                            <span class="theme-switch" aria-hidden="true"></span>
                            <span id="theme-label">Tema claro</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>