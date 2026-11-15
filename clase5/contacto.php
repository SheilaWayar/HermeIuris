<?php
require_once __DIR__ . '/includes/funciones.php';

$base = '../';                       // el header/nav/footer del sitio están una carpeta arriba
$titulo_pagina = 'Contacto';
$descripcion_pagina = 'Escribinos tu consulta a Herme Iuris.';

$datos   = ['nombre' => '', 'email' => '', 'asunto' => '', 'mensaje' => ''];
$errores = [];
$exito   = false;
$resumen = [];

// Solo se procesa si el formulario llegó por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // 1) Captura + sanitización (trim + htmlspecialchars) de TODOS los campos
    foreach ($datos as $campo => $_) {
        $datos[$campo] = post($campo);
    }

    // 2) Validación en servidor
    if (empty($datos['nombre'])) {
        $errores['nombre'] = 'El nombre es obligatorio.';
    } elseif (mb_strlen($datos['nombre']) < 2 || mb_strlen($datos['nombre']) > 60) {
        $errores['nombre'] = 'El nombre debe tener entre 2 y 60 caracteres.';
    }

    if (empty($datos['email'])) {
        $errores['email'] = 'El correo electrónico es obligatorio.';
    } elseif (!email_valido($datos['email'])) {
        $errores['email'] = 'El formato del correo electrónico no es válido (ej: nombre@dominio.com).';
    }

    if (empty($datos['asunto'])) {
        $errores['asunto'] = 'El asunto es obligatorio.';
    } elseif (mb_strlen($datos['asunto']) > 100) {
        $errores['asunto'] = 'El asunto no puede superar los 100 caracteres.';
    }

    if (empty($datos['mensaje'])) {
        $errores['mensaje'] = 'El mensaje es obligatorio.';
    } elseif (mb_strlen($datos['mensaje']) < 10) {
        $errores['mensaje'] = 'El mensaje debe tener al menos 10 caracteres.';
    } elseif (mb_strlen($datos['mensaje']) > 1000) {
        $errores['mensaje'] = 'El mensaje no puede superar los 1000 caracteres.';
    }

    // 3) Resultado
    if (empty($errores)) {
        $exito   = true;
        $resumen = $datos;
        $datos   = ['nombre' => '', 'email' => '', 'asunto' => '', 'mensaje' => ''];
    }
}

require_once __DIR__ . '/../includes/header.php';
?>

<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-7">
            <p class="eyebrow mb-1">Consultas</p>
            <h1 class="mb-2">Contacto</h1>
            <p class="text-muted mb-4">Completá el formulario y te respondemos a la brevedad. <span class="small">(Método POST)</span></p>

            <?php if ($exito): ?>
                <div class="alerta alerta-ok" role="status">
                    <strong>¡Mensaje enviado con éxito!</strong>
                    <ul>
                        <li><strong>Nombre:</strong> <?= $resumen['nombre'] ?></li>
                        <li><strong>Email:</strong> <?= $resumen['email'] ?></li>
                        <li><strong>Asunto:</strong> <?= $resumen['asunto'] ?></li>
                        <li><strong>Mensaje:</strong> <?= nl2br($resumen['mensaje']) ?></li>
                    </ul>
                </div>
            <?php elseif (!empty($errores)): ?>
                <div class="alerta alerta-error" role="alert">
                    <strong>No se pudo enviar el formulario. Corregí los siguientes errores:</strong>
                    <ul>
                        <?php foreach ($errores as $error): ?>
                            <li><?= $error ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <div class="card-ley p-4">
                <form action="contacto.php" method="post" novalidate>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" id="nombre" name="nombre" class="form-control <?= isset($errores['nombre']) ? 'is-invalid' : '' ?>"
                               value="<?= valor($datos, 'nombre') ?>">
                        <?php if (isset($errores['nombre'])): ?><p class="error-campo"><?= $errores['nombre'] ?></p><?php endif; ?>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" id="email" name="email" class="form-control <?= isset($errores['email']) ? 'is-invalid' : '' ?>"
                               value="<?= valor($datos, 'email') ?>">
                        <?php if (isset($errores['email'])): ?><p class="error-campo"><?= $errores['email'] ?></p><?php endif; ?>
                    </div>

                    <div class="mb-3">
                        <label for="asunto" class="form-label">Asunto</label>
                        <input type="text" id="asunto" name="asunto" class="form-control <?= isset($errores['asunto']) ? 'is-invalid' : '' ?>"
                               value="<?= valor($datos, 'asunto') ?>">
                        <?php if (isset($errores['asunto'])): ?><p class="error-campo"><?= $errores['asunto'] ?></p><?php endif; ?>
                    </div>

                    <div class="mb-4">
                        <label for="mensaje" class="form-label">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" rows="6" class="form-control <?= isset($errores['mensaje']) ? 'is-invalid' : '' ?>"><?= valor($datos, 'mensaje') ?></textarea>
                        <?php if (isset($errores['mensaje'])): ?><p class="error-campo"><?= $errores['mensaje'] ?></p><?php endif; ?>
                    </div>

                    <button type="submit" class="btn btn-gold px-4 py-2">Enviar mensaje</button>
                </form>
            </div>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>