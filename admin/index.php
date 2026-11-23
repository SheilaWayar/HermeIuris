<?php
// ADMIN > Temas del foro (listado con INNER JOIN a usuarios y categorías)
$base = '../';
$rol_requerido = 'admin';
require_once __DIR__ . '/../includes/auth_guard.php';   // 🔒 sesión + rol admin
require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../includes/helpers.php';

// Mensajes posibles (lista blanca: nunca se imprime lo que llega por la URL)
$mensajes = [
    'created'  => ['success', 'Tema creado correctamente.'],
    'updated'  => ['success', 'Tema actualizado correctamente.'],
    'deleted'  => ['success', 'Tema eliminado correctamente.'],
    'notfound' => ['warning', 'No se encontró el tema solicitado.'],
    'error'    => ['danger',  'La solicitud no es válida.'],
];
$status = (isset($_GET['status']) && is_string($_GET['status'])) ? $_GET['status'] : '';
$aviso  = $mensajes[$status] ?? null;

// Filtro opcional por categoría (GET validado)
$categorias = obtener_categorias($pdo);
$filtro = filter_input(INPUT_GET, 'categoria', FILTER_VALIDATE_INT);
$filtro = ($filtro !== false && $filtro !== null && $filtro > 0) ? $filtro : 0;

$sql = "SELECT t.id_tema, t.titulo, t.estado, t.created_at,
               c.nombre AS categoria,
               CONCAT(u.nombre, ' ', u.apellido) AS autor
        FROM temas_foro t
        INNER JOIN usuarios        u ON u.id_usuario   = t.id_usuario
        INNER JOIN categorias_foro c ON c.id_categoria = t.id_categoria";
$params = [];
if ($filtro > 0) {
    $sql .= ' WHERE t.id_categoria = :categoria';
    $params[':categoria'] = $filtro;
}
$sql .= ' ORDER BY t.created_at DESC, t.id_tema DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$temas = $stmt->fetchAll();

$titulo_pagina = 'Administración de temas del foro';
require_once __DIR__ . '/../includes/header.php';
?>
<main class="container py-5">
    <?php require __DIR__ . '/_nav.php'; ?>

    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 class="titulo-dorado h2 mb-0">Administración del foro</h1>
        <a href="crear.php" class="btn btn-gold">+ Nuevo tema</a>
    </div>

    <?php if ($aviso): ?>
        <div class="alert alert-<?= e($aviso[0]) ?>"><?= e($aviso[1]) ?></div>
    <?php endif; ?>

    <form method="get" class="row g-2 align-items-end mb-4">
        <div class="col-sm-6 col-md-4">
            <label for="categoria" class="form-label">Filtrar por categoría</label>
            <select id="categoria" name="categoria" class="form-select">
                <option value="0">Todas</option>
                <?php foreach ($categorias as $c): ?>
                    <option value="<?= (int) $c['id_categoria'] ?>"
                        <?= $filtro === (int) $c['id_categoria'] ? 'selected' : '' ?>>
                        <?= e($c['nombre']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-navy">Filtrar</button>
            <a href="index.php" class="btn btn-outline-secondary">Limpiar</a>
        </div>
    </form>

    <p class="text-muted"><?= count($temas) ?> tema(s) encontrado(s)</p>

    <div class="table-responsive">
        <table class="table table-striped align-middle">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Autor</th>
                    <th>Estado</th>
                    <th>Creado</th>
                    <th class="text-end">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!$temas): ?>
                    <tr><td colspan="7" class="text-center text-muted py-4">No hay temas para mostrar.</td></tr>
                <?php endif; ?>
                <?php foreach ($temas as $t): ?>
                    <tr>
                        <td><?= e($t['id_tema']) ?></td>
                        <td><?= e($t['titulo']) ?></td>
                        <td><?= e($t['categoria']) ?></td>
                        <td><?= e($t['autor']) ?></td>
                        <td>
                            <span class="badge <?= $t['estado'] === 'abierto' ? 'text-bg-success' : 'text-bg-secondary' ?>">
                                <?= e($t['estado']) ?>
                            </span>
                        </td>
                        <td><?= e(date('d/m/Y H:i', strtotime($t['created_at']))) ?></td>
                        <td class="text-end text-nowrap">
                            <a href="editar.php?id=<?= (int) $t['id_tema'] ?>" class="btn btn-sm btn-outline-warning">Editar</a>
                            <form method="post" action="eliminar.php" class="d-inline"
                                  onsubmit="return confirm('¿Confirmás eliminar este tema? También se borrarán sus respuestas.');">
                                <input type="hidden" name="id_tema" value="<?= (int) $t['id_tema'] ?>">
                                <button type="submit" class="btn btn-sm btn-outline-danger">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</main>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>