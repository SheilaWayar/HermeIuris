<?php
require 'includes/funciones.php';
$titulo = 'Contacto';

$nombre = $email = $mensaje = '';
$errores = [];
$exito = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre  = post('nombre');
    $email   = post('email');
    $mensaje = post('mensaje');

    if (empty($nombre)) {
        $errores[] = 'El nombre es obligatorio.';
    }
    if (empty($email)) {
        $errores[] = 'El email es obligatorio.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = 'El email no tiene un formato válido.';
    }
    if (strlen($mensaje) < 10) {
        $errores[] = 'El mensaje debe tener al menos 10 caracteres.';
    }

    if (empty($errores)) {
        $exito = true;
    }
}

require 'includes/header.php';
?>

<h2>Contacto</h2>

<?php if ($exito): ?>
    <p style="color:green">¡Mensaje enviado! Gracias, <?= $nombre ?>.</p>
<?php endif; ?>

<?php if (!empty($errores)): ?>
    <ul style="color:red">
        <?php foreach ($errores as $e): ?>
            <li><?= $e ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>

<form action="contacto.php" method="post">
    <label>Nombre</label>
    <input type="text" name="nombre" value="<?= $nombre ?>">

    <label>Email</label>
    <input type="email" name="email" value="<?= $email ?>">

    <label>Mensaje</label>
    <textarea name="mensaje"><?= $mensaje ?></textarea>

    <button type="submit">Enviar</button>
</form>

<?php require 'includes/footer.php'; ?>