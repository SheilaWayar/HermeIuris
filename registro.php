<?php
// REGISTRO: alta de usuario con datos personales (nombre, apellido, DNI, email),
// contraseña hasheada (bcrypt) y consultas preparadas
require_once __DIR__ . '/config/conexion.php';
require_once __DIR__ . '/includes/session.php';
require_once __DIR__ . '/includes/historial.php';

if (usuario_logueado()) {
    header('Location: panel.php');
    exit;
}

$errores = [];
$datos = ['nombre' => '', 'apellido' => '', 'dni' => '', 'email' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datos['nombre']   = post_texto('nombre');
    $datos['apellido'] = post_texto('apellido');
    $datos['email']    = mb_strtolower(post_texto('email'));
    // DNI: se aceptan puntos o espacios al escribirlo, pero se guarda solo con dígitos
    $datos['dni']      = preg_replace('/\D/', '', post_texto('dni'));

    // Las contraseñas NO se recortan (trim): los espacios pueden ser parte de la clave
    $password  = (isset($_POST['password']) && is_string($_POST['password'])) ? $_POST['password'] : '';
    $confirmar = (isset($_POST['confirmar']) && is_string($_POST['confirmar'])) ? $_POST['confirmar'] : '';

    // --- Validación estricta ---
    $patron_nombre = "/^[\p{L}][\p{L}\s'.\-]*$/u";

    foreach (['nombre' => 'El nombre', 'apellido' => 'El apellido'] as $campo => $etiqueta) {
        $largo = mb_strlen($datos[$campo]);
        if ($largo < 2 || $largo > 60) {
            $errores[$campo] = "$etiqueta debe tener entre 2 y 60 caracteres.";
        } elseif (!preg_match($patron_nombre, $datos[$campo])) {
            $errores[$campo] = "$etiqueta solo puede tener letras, espacios, apóstrofes, puntos y guiones.";
        }
    }

    if (!preg_match('/^\d{7,8}$/', $datos['dni'])) {
        $errores['dni'] = 'Ingresá un DNI válido (7 u 8 dígitos).';
    }

    if (mb_strlen($datos['email']) > 120 || !filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
        $errores['email'] = 'Ingresá un correo electrónico válido.';
    }

    if (strlen($password) < 8 || strlen($password) > 72) {
        $errores['password'] = 'La contraseña debe tener entre 8 y 72 caracteres.';
    } elseif (!preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
        $errores['password'] = 'La contraseña debe incluir al menos una letra y un número.';
    }

    if ($password !== $confirmar) {
        $errores['confirmar'] = 'Las contraseñas no coinciden.';
    }

    // --- El correo y el DNI no pueden existir previamente ---
    if (!isset($errores['email'])) {
        $stmt = $pdo->prepare('SELECT id_usuario FROM usuarios WHERE email = :email LIMIT 1');
        $stmt->execute([':email' => $datos['email']]);
        if ($stmt->fetch()) {
            $errores['email'] = 'Ese correo ya está registrado.';
        }
    }
    if (!isset($errores['dni'])) {
        $stmt = $pdo->prepare('SELECT id_usuario FROM usuarios WHERE dni = :dni LIMIT 1');
        $stmt->execute([':dni' => $datos['dni']]);
        if ($stmt->fetch()) {
            $errores['dni'] = 'Ese DNI ya está registrado.';
        }
    }

    // --- Alta ---
    if (!$errores) {
        $stmt = $pdo->prepare('SELECT id_rol FROM roles WHERE nombre = :nombre LIMIT 1');
        $stmt->execute([':nombre' => 'usuario']);
        $rol = $stmt->fetch();

        if (!$rol) {
            $errores['general'] = "Falta el rol 'usuario' en la tabla roles. Ejecutá el SQL del TP8 en phpMyAdmin.";
        } else {
            $hash = password_hash($password, PASSWORD_BCRYPT);

            try {
                $stmt = $pdo->prepare(
                    'INSERT INTO usuarios (id_rol, nombre, apellido, dni, email, password_hash)
                     VALUES (:id_rol, :nombre, :apellido, :dni, :email, :password_hash)'
                );
                $stmt->execute([
                    ':id_rol'        => $rol['id_rol'],
                    ':nombre'        => $datos['nombre'],
                    ':apellido'      => $datos['apellido'],
                    ':dni'           => $datos['dni'],
                    ':email'         => $datos['email'],
                    ':password_hash' => $hash,
                ]);

                registrar_evento($pdo, (int) $pdo->lastInsertId(), 'registro');

                header('Location: login.php?status=registrado');
                exit;
            } catch (PDOException $e) {
                // 1062 = clave duplicada (dos registros simultáneos con el mismo correo o DNI)
                if (isset($e->errorInfo[1]) && (int) $e->errorInfo[1] === 1062) {
                    $errores['email'] = 'El correo o el DNI ya están registrados.';
                } else {
                    error_log('Error en registro: ' . $e->getMessage());
                    $errores['general'] = 'No se pudo completar el registro. Intentá de nuevo.';
                }
            }
        }
    }
}

$titulo_pagina = 'Crear cuenta';
require_once 'includes/header.php';
?>
<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <h1 class="titulo-dorado h2 mb-4">Crear cuenta</h1>

            <?php if ($errores): ?>
                <div class="alert alert-danger">
                    <strong>Revisá los siguientes datos:</strong>
                    <ul class="mb-0">
                        <?php foreach ($errores as $mensaje): ?>
                            <li><?= e($mensaje) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form method="post" novalidate>
                <div class="row">
                    <div class="col-sm-6 mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" id="nombre" name="nombre" maxlength="60" required
                               class="form-control <?= isset($errores['nombre']) ? 'is-invalid' : '' ?>"
                               value="<?= e($datos['nombre']) ?>">
                    </div>
                    <div class="col-sm-6 mb-3">
                        <label for="apellido" class="form-label">Apellido</label>
                        <input type="text" id="apellido" name="apellido" maxlength="60" required
                               class="form-control <?= isset($errores['apellido']) ? 'is-invalid' : '' ?>"
                               value="<?= e($datos['apellido']) ?>">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="dni" class="form-label">DNI</label>
                    <input type="text" id="dni" name="dni" maxlength="10" required inputmode="numeric"
                           autocomplete="off"
                           class="form-control <?= isset($errores['dni']) ? 'is-invalid' : '' ?>"
                           value="<?= e($datos['dni']) ?>">
                    <div class="form-text">Sin puntos ni espacios. Solo lo ve la administración del sitio.</div>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input type="email" id="email" name="email" maxlength="120" required autocomplete="email"
                           class="form-control <?= isset($errores['email']) ? 'is-invalid' : '' ?>"
                           value="<?= e($datos['email']) ?>">
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" id="password" name="password" maxlength="72" required autocomplete="new-password"
                           class="form-control <?= isset($errores['password']) ? 'is-invalid' : '' ?>">
                    <div class="form-text">Entre 8 y 72 caracteres, con al menos una letra y un número.</div>
                </div>

                <div class="mb-4">
                    <label for="confirmar" class="form-label">Repetí la contraseña</label>
                    <input type="password" id="confirmar" name="confirmar" maxlength="72" required autocomplete="new-password"
                           class="form-control <?= isset($errores['confirmar']) ? 'is-invalid' : '' ?>">
                </div>

                <button type="submit" class="btn btn-gold">Registrarme</button>
                <a href="login.php" class="btn btn-outline-secondary">Ya tengo cuenta</a>
            </form>
        </div>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>