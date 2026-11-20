<?php
// PANEL (página protegida): cualquier usuario autenticado puede entrar
$base = '';
require_once __DIR__ . '/includes/auth_guard.php';   // redirige a login.php si no hay sesión
require_once __DIR__ . '/config/conexion.php';

$avisos = [
    'sin_permiso' => ['warning', 'No tenés permisos para acceder a esa sección.'],
];
$aviso = null;
if (isset($_GET['error']) && is_string($_GET['error']) && isset($avisos[$_GET['error']])) {
    $aviso = $avisos[$_GET['error']];
}

// Datos del usuario (siempre se consulta por el id guardado en la sesión)
$stmt = $pdo->prepare('SELECT nombre, apellido, email, created_at FROM usuarios WHERE id_usuario = :id');
$stmt->execute([':id' => $_SESSION['usuario_id']]);
$perfil = $stmt->fetch();

if (!$perfil) {
    // El usuario ya no existe en la base: se cierra la sesión
    header('Location: logout.php');
    exit;
}

// Cursos en los que está inscripto
$stmt = $pdo->prepare(
    'SELECT c.titulo, a.nombre AS area, i.fecha_inscripcion
     FROM inscripciones i
     INNER JOIN cursos c        ON c.id_curso = i.id_curso
     INNER JOIN areas_derecho a ON a.id_area  = c.id_area
     WHERE i.id_usuario = :id
     ORDER BY c.titulo'
);
$stmt->execute([':id' => $_SESSION['usuario_id']]);
$cursos = $stmt->fetchAll();

$titulo_pagina = 'Mi panel';
require_once 'includes/header.php';
?>
<main class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 class="titulo-dorado h2 mb-0">Hola, <?= e($_SESSION['usuario_nombre']) ?></h1>
        <a href="logout.php" class="btn btn-outline-secondary">Cerrar sesión</a>
    </div>

    <?php if ($aviso): ?>
        <div class="alert alert-<?= e($aviso[0]) ?>"><?= e($aviso[1]) ?></div>
    <?php endif; ?>

    <div class="row g-4">
        <div class="col-md-5">
            <div class="card-ley p-4 h-auto">
                <h2 class="fs-5">Mis datos</h2>
                <p class="mb-1"><strong>Nombre:</strong> <?= e($perfil['nombre'] . ' ' . $perfil['apellido']) ?></p>
                <p class="mb-1"><strong>Correo:</strong> <?= e($perfil['email']) ?></p>
                <p class="mb-1"><strong>Rol:</strong> <span class="tag"><?= e($_SESSION['rol']) ?></span></p>
                <p class="mb-0"><strong>Miembro desde:</strong> <?= e(date('d/m/Y', strtotime($perfil['created_at']))) ?></p>
            </div>
        </div>

        <div class="col-md-7">
            <div class="card-ley p-4 h-auto">
                <h2 class="fs-5">Mis cursos</h2>
                <?php if (!$cursos): ?>
                    <p class="text-secondary mb-0">Todavía no te inscribiste a ningún curso.</p>
                <?php else: ?>
                    <ul class="mb-0">
                        <?php foreach ($cursos as $c): ?>
                            <li><?= e($c['titulo']) ?> <span class="tag"><?= e($c['area']) ?></span></li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <?php if ($_SESSION['rol'] === 'admin'): ?>
        <div class="mt-4">
            <a href="admin/index.php" class="btn btn-gold">Ir a la administración del foro</a>
        </div>
    <?php endif; ?>
</main>
<?php require_once 'includes/footer.php'; ?>