<?php
// CREATE: alta de un tema del foro
require_once '../config/conexion.php';
require_once '../includes/helpers.php';

$categorias = obtener_categorias($pdo);
$usuarios   = obtener_usuarios($pdo);
$errores    = [];
$datos = [
    'titulo'       => '',
    'contenido'    => '',
    'id_categoria' => 0,
    'id_usuario'   => 0,
    'estado'       => 'abierto',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datos['titulo']       = post_texto('titulo');
    $datos['contenido']    = post_texto('contenido');
    $datos['id_categoria'] = (int) post_texto('id_categoria');
    $datos['id_usuario']   = (int) post_texto('id_usuario');

    $errores = validar_tema($datos, $categorias, $usuarios);

    if (!$errores) {
        // Consulta preparada (anti SQL Injection)
        $sql = 'INSERT INTO temas_foro (id_usuario, id_categoria, titulo, contenido)
                VALUES (:id_usuario, :id_categoria, :titulo, :contenido)';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id_usuario'   => $datos['id_usuario'],
            ':id_categoria' => $datos['id_categoria'],
            ':titulo'       => $datos['titulo'],
            ':contenido'    => $datos['contenido'],
        ]);

        // Redirigir ANTES de imprimir cualquier HTML
        header('Location: index.php?status=created');
        exit;
    }
}

$titulo_pagina = 'Nuevo tema del foro';
$base = '../';
$modo = 'crear';
require_once '../includes/header.php';
?>
<main class="container py-5">
    <h1 class="titulo-dorado h2 mb-4">Nuevo tema</h1>
    <?php require __DIR__ . '/_form.php'; ?>
</main>
<?php require_once '../includes/footer.php'; ?>