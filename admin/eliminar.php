<?php
// DELETE: baja de un tema del foro. Solo acepta POST (no se borra con un simple enlace).
require_once '../config/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$id = filter_input(INPUT_POST, 'id_tema', FILTER_VALIDATE_INT);
if (!$id || $id < 1) {
    header('Location: index.php?status=error');
    exit;
}

// Las respuestas del tema se borran solas por el ON DELETE CASCADE definido en schema.sql
$stmt = $pdo->prepare('DELETE FROM temas_foro WHERE id_tema = :id');
$stmt->execute([':id' => $id]);

header('Location: index.php?status=' . ($stmt->rowCount() > 0 ? 'deleted' : 'notfound'));
exit;