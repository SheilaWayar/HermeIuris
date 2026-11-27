<?php

$base = '../';
$rol_requerido = 'admin';

require_once __DIR__ . '/../includes/auth_guard.php';
require_once __DIR__ . '/../config/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: usuarios.php');
    exit;
}

$id_usuario = filter_input(
    INPUT_POST,
    'id_usuario',
    FILTER_VALIDATE_INT
);

$motivo = trim($_POST['motivo_baja'] ?? '');

if (!$id_usuario) {
    header('Location: usuarios.php');
    exit;
}

$stmt = $pdo->prepare("
    UPDATE usuarios
    SET activo = 0,
        motivo_baja = :motivo
    WHERE id_usuario = :id
");

$stmt->execute([
    ':motivo' => $motivo,
    ':id' => $id_usuario
]);

header('Location: usuario.php?id=' . $id_usuario);
exit;