<?php
// ADMIN: ficha de un usuario (datos personales, cursos e historial). Solo rol 'admin'
$base = '../';
$rol_requerido = 'admin';
require_once __DIR__ . '/../includes/auth_guard.php';
require_once __DIR__ . '/../config/conexion.php';

function fecha_ar(?string $f): string
{
    return $f ? date('d/m/Y H:i', strtotime($f)) : '—';
}

$etiquetas = [
    'registro'      => 'Registro de la cuenta',
    'login'         => 'Inicio de sesión',
    'login_fallido' => 'Intento de acceso fallido',
    'logout'        => 'Cierre de sesión',
];

$error   = '';
$usuario = null;
$cursos  = [];
$historial = [];

$id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);

if ($id === false || $id === null) {
    http_response_code(400);
    $error = 'El identificador de usuario no es válido.';
} else {
    $stmt = $pdo->prepare(
        'SELECT u.id_usuario, u.nombre, u.apellido, u.dni, u.email, u.activo, u.created_at, r.nombre AS rol
         FROM usuarios u
         INNER JOIN roles r ON r.id_rol = u.id_rol
         WHERE u.id_usuario = :id'
    );
    $stmt->execute([':id' => $id]);
    $usuario = $stmt->fetch();

    if (!$usuario) {
        http_response_code(404);
        $error = 'No existe un usuario con ese identificador.';
    } else {
        // Cursos en los que está inscripto
        $stmt = $pdo->prepare(
            'SELECT c.titulo, a.nombre AS area, i.fecha_inscripcion
             FROM inscripciones i
             INNER JOIN cursos c        ON c.id_curso = i.id_curso
             INNER JOIN areas_derecho a ON a.id_area  = c.id_area
             WHERE i.id_usuario = :id
             ORDER BY i.fecha_inscripcion DESC'
        );
        $stmt->execute([':id' => $id]);
        $cursos = $stmt->fetchAll();

        // Últimos 50 eventos del historial
        $stmt = $pdo->prepare(
            'SELECT evento, ip, user_agent, fecha
             FROM historial_accesos
             WHERE id_usuario = :id
             ORDER BY fecha DESC, id_historial DESC
             LIMIT 50'
        );
        $stmt->execute([':id' => $id]);
        $historial = $stmt->fetchAll();
    }
}

$titulo_pagina = 'Detalle de usuario';
require_once __DIR__ . '/../includes/header.php';
?>
<main class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 class="titulo-dorado h2 mb-0">Detalle de usuario</h1>
        <a href="usuarios.php" class="btn btn-outline-secondary">Volver al listado</a>
    </div>

    <?php if ($error): ?>
        <div class="alert alert-danger"><?= e($error) ?></div>
    <?php else: ?>
        <div class="row g-4">
            <div class="col-lg-5">
                <div class="card-ley p-4 h-auto">
                    <h2 class="fs-5">Datos personales</h2>
                    <p class="mb-1"><strong>Nombre completo:</strong> <?= e($usuario['nombre'] . ' ' . $usuario['apellido']) ?></p>
                    <p class="mb-1"><strong>DNI:</strong> <?= $usuario['dni'] ? e($usuario['dni']) : '—' ?></p>
                    <p class="mb-1"><strong>Correo:</strong> <?= e($usuario['email']) ?></p>
                    <p class="mb-1"><strong>Rol:</strong> <span class="tag"><?= e($usuario['rol']) ?></span></p>
                    <p class="mb-1"><strong>Estado:</strong> <?= (int) $usuario['activo'] === 1 ? 'Activo' : 'Inactivo' ?></p>
                    <p class="mb-0"><strong>Miembro desde:</strong> <?= e(fecha_ar($usuario['created_at'])) ?></p>
                </div>

                <div class="card-ley p-4 h-auto mt-4">
                    <h2 class="fs-5">Cursos inscriptos</h2>
                    <?php if (!$cursos): ?>
                        <p class="text-secondary mb-0">Sin inscripciones.</p>
                    <?php else: ?>
                        <ul class="mb-0">
                            <?php foreach ($cursos as $c): ?>
                                <li><?= e($c['titulo']) ?> <span class="tag"><?= e($c['area']) ?></span>
                                    <small class="text-secondary">(<?= e(fecha_ar($c['fecha_inscripcion'])) ?>)</small></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>

            <div class="col-lg-7">
                <div class="card-ley p-4 h-auto">
                    <h2 class="fs-5">Historial de actividad (últimos 50 eventos)</h2>
                    <?php if (!$historial): ?>
                        <p class="text-secondary mb-0">Todavía no hay actividad registrada.</p>
                    <?php else: ?>
                        <div class="table-responsive">
                            <table class="table table-sm align-middle mb-0">
                                <thead><tr><th>Fecha</th><th>Evento</th><th>IP</th><th>Navegador</th></tr></thead>
                                <tbody>
                                <?php foreach ($historial as $h): ?>
                                    <tr>
                                        <td><?= e(fecha_ar($h['fecha'])) ?></td>
                                        <td><?= e($etiquetas[$h['evento']] ?? $h['evento']) ?></td>
                                        <td><?= e($h['ip'] ?? '—') ?></td>
                                        <td class="small"><?= e(mb_substr((string) $h['user_agent'], 0, 60)) ?></td>
                                    </tr>
                                <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    <?php endif; ?>
</main>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>