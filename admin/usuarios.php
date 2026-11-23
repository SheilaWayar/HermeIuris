<?php
// ADMIN: listado de usuarios registrados (solo rol 'admin')
$base = '../';
$rol_requerido = 'admin';
require_once __DIR__ . '/../includes/auth_guard.php';
require_once __DIR__ . '/../config/conexion.php';

$q = isset($_GET['q']) && is_string($_GET['q']) ? trim($_GET['q']) : '';
$q = mb_substr($q, 0, 100);

$sql = 'SELECT u.id_usuario, u.nombre, u.apellido, u.dni, u.email, u.activo, u.created_at,
               r.nombre AS rol,
               (SELECT MAX(h.fecha) FROM historial_accesos h
                 WHERE h.id_usuario = u.id_usuario AND h.evento = \'login\') AS ultimo_acceso
        FROM usuarios u
        INNER JOIN roles r ON r.id_rol = u.id_rol';
$params = [];

if ($q !== '') {
    $like = '%' . addcslashes($q, '%_\\') . '%';
    $sql .= ' WHERE u.nombre LIKE ? OR u.apellido LIKE ? OR u.email LIKE ? OR u.dni LIKE ?';
    $params = [$like, $like, $like, $like];
}
$sql .= ' ORDER BY u.created_at DESC LIMIT 200';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$usuarios = $stmt->fetchAll();

function fecha_ar(?string $f): string
{
    return $f ? date('d/m/Y H:i', strtotime($f)) : '—';
}

$titulo_pagina = 'Usuarios registrados';
require_once __DIR__ . '/../includes/header.php';
?>
<main class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 class="titulo-dorado h2 mb-0">Usuarios registrados</h1>
        <a href="index.php" class="btn btn-outline-secondary">Volver a la administración</a>
    </div>

    <form method="get" class="row g-2 mb-4">
        <div class="col-md-8">
            <input type="search" name="q" class="form-control" maxlength="100"
                   placeholder="Buscar por nombre, apellido, DNI o correo..."
                   value="<?= e($q) ?>" aria-label="Buscar usuarios">
        </div>
        <div class="col-md-4 d-flex gap-2">
            <button type="submit" class="btn btn-gold">Buscar</button>
            <?php if ($q !== ''): ?><a href="usuarios.php" class="btn btn-outline-secondary">Limpiar</a><?php endif; ?>
        </div>
    </form>

    <p class="text-secondary small"><?= count($usuarios) ?> usuario(s) encontrado(s).</p>

    <div class="table-responsive">
        <table class="table table-bordered align-middle">
            <thead>
                <tr>
                    <th>ID</th><th>Nombre completo</th><th>DNI</th><th>Correo</th>
                    <th>Rol</th><th>Estado</th><th>Alta</th><th>Último acceso</th><th></th>
                </tr>
            </thead>
            <tbody>
            <?php if (!$usuarios): ?>
                <tr><td colspan="9" class="text-center text-secondary">No hay usuarios para mostrar.</td></tr>
            <?php endif; ?>
            <?php foreach ($usuarios as $u): ?>
                <tr>
                    <td><?= e($u['id_usuario']) ?></td>
                    <td><?= e($u['nombre'] . ' ' . $u['apellido']) ?></td>
                    <td><?= $u['dni'] ? e($u['dni']) : '—' ?></td>
                    <td><?= e($u['email']) ?></td>
                    <td><span class="tag"><?= e($u['rol']) ?></span></td>
                    <td><?= (int) $u['activo'] === 1 ? 'Activo' : 'Inactivo' ?></td>
                    <td><?= e(fecha_ar($u['created_at'])) ?></td>
                    <td><?= e(fecha_ar($u['ultimo_acceso'])) ?></td>
                    <td><a class="btn btn-sm btn-navy" href="usuario.php?id=<?= (int) $u['id_usuario'] ?>">Ver detalle</a></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</main>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>