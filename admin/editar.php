<?php
// UPDATE: edición de un tema del foro
require_once '../config/conexion.php';
require_once '../includes/helpers.php';

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id || $id < 1) {
    header('Location: index.php?status=error');
    exit;
}

// Buscar el registro a editar
$stmt = $pdo->prepare(
    'SELECT id_tema, id_usuario, id_categoria, titulo, contenido, estado
     FROM temas_foro
     WHERE id_tema = :id'
);
$stmt->execute([':id' => $id]);
$tema = $stmt->fetch();

if (!$tema) {
    header('Location: index.php?status=notfound');
    exit;
}

$categorias = obtener_categorias($pdo);
$usuarios   = obtener_usuarios($pdo);
$errores    = [];
$datos = [
    'titulo'       => $tema['titulo'],
    'contenido'    => $tema['contenido'],
    'id_categoria' => (int) $tema['id_categoria'],
    'id_usuario'   => (int) $tema['id_usuario'],
    'estado'       => $tema['estado'],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datos['titulo']       = post_texto('titulo');
    $datos['contenido']    = post_texto('contenido');
    $datos['id_categoria'] = (int) post_texto('id_categoria');
    $datos['id_usuario']   = (int) post_texto('id_usuario');
    $datos['estado']       = post_texto('estado');

    $errores = validar_tema($datos, $categorias, $usuarios, true);

    if (!$errores) {
        $sql = 'UPDATE temas_foro
                SET id_usuario = :id_usuario,
                    id_categoria = :id_categoria,
                    titulo = :titulo,
                    contenido = :contenido,
                    estado = :estado
                WHERE id_tema = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id_usuario'   => $datos['id_usuario'],
            ':id_categoria' => $datos['id_categoria'],
            ':titulo'       => $datos['titulo'],
            ':contenido'    => $datos['contenido'],
            ':estado'       => $datos['estado'],
            ':id'           => $id,
        ]);

        header('Location: index.php?status=updated');
        exit;
    }
}

$titulo_pagina = 'Editar tema del foro';
$base = '../';
$modo = 'editar';
require_once '../includes/header.php';
?>
<main class="container py-5">
    <h1 class="titulo-dorado h2 mb-4">Editar tema #<?= (int) $id ?></h1>
    <?php require __DIR__ . '/_form.php'; ?>
</main>
<?php require_once '../includes/footer.php'; ?>