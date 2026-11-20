<?php
// LOGIN: validación con password_verify y sesión segura
require_once __DIR__ . '/config/conexion.php';
require_once __DIR__ . '/includes/session.php';   // ejecuta session_start()

if (usuario_logueado()) {
    header('Location: panel.php');
    exit;
}

// Avisos por URL (lista blanca: nunca se imprime lo que llega en la URL)
$avisos = [
    'acceso_denegado' => ['warning', 'Tenés que iniciar sesión para acceder a esa página.'],
    'registrado'      => ['success', 'Cuenta creada correctamente. Ya podés iniciar sesión.'],
    'logout'          => ['info',    'Cerraste sesión correctamente.'],
];
$clave_aviso = '';
foreach (['error', 'status'] as $parametro) {
    if (isset($_GET[$parametro]) && is_string($_GET[$parametro]) && isset($avisos[$_GET[$parametro]])) {
        $clave_aviso = $_GET[$parametro];
        break;
    }
}
$aviso = $avisos[$clave_aviso] ?? null;

$error = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = mb_strtolower(post_texto('email'));
    $password = (isset($_POST['password']) && is_string($_POST['password'])) ? $_POST['password'] : '';

    if ($email === '' || $password === '') {
        $error = 'Completá el correo y la contraseña.';
    } else {
        $stmt = $pdo->prepare(
            'SELECT u.id_usuario, u.nombre, u.password_hash, u.activo, r.nombre AS rol
             FROM usuarios u
             INNER JOIN roles r ON r.id_rol = u.id_rol
             WHERE u.email = :email
             LIMIT 1'
        );
        $stmt->execute([':email' => $email]);
        $usuario = $stmt->fetch();

        if ($usuario) {
            $credenciales_ok = password_verify($password, $usuario['password_hash']);
        } else {
            // Gasta el mismo tiempo que una verificación real (evita revelar qué correos existen)
            password_hash($password, PASSWORD_BCRYPT);
            $credenciales_ok = false;
        }

        if ($credenciales_ok && (int) $usuario['activo'] === 1) {
            // Evita la fijación de sesión: nuevo ID y se descarta el anterior
            session_regenerate_id(true);

            $_SESSION['usuario_id']     = (int) $usuario['id_usuario'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];
            $_SESSION['rol']            = $usuario['rol'];

            // Si el algoritmo de hash mejoró desde el registro, se actualiza el hash guardado
            if (password_needs_rehash($usuario['password_hash'], PASSWORD_BCRYPT)) {
                $stmt = $pdo->prepare('UPDATE usuarios SET password_hash = :hash WHERE id_usuario = :id');
                $stmt->execute([
                    ':hash' => password_hash($password, PASSWORD_BCRYPT),
                    ':id'   => $usuario['id_usuario'],
                ]);
            }

            header('Location: ' . ($usuario['rol'] === 'admin' ? 'admin/index.php' : 'panel.php'));
            exit;
        }

        // Mensaje genérico: no dice si falló el correo o la contraseña
        $error = 'Correo o contraseña incorrectos.';
    }
}

$titulo_pagina = 'Iniciar sesión';
require_once 'includes/header.php';
?>
<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
            <h1 class="titulo-dorado h2 mb-4">Iniciar sesión</h1>

            <?php if ($aviso): ?>
                <div class="alert alert-<?= e($aviso[0]) ?>"><?= e($aviso[1]) ?></div>
            <?php endif; ?>

            <?php if ($error): ?>
                <div class="alert alert-danger"><?= e($error) ?></div>
            <?php endif; ?>

            <form method="post" novalidate>
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input type="email" id="email" name="email" maxlength="120" required autocomplete="email"
                           class="form-control" value="<?= e($email) ?>">
                </div>
                <div class="mb-4">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" id="password" name="password" maxlength="72" required autocomplete="current-password"
                           class="form-control">
                </div>
                <button type="submit" class="btn btn-gold">Ingresar</button>
                <a href="registro.php" class="btn btn-outline-secondary">Crear cuenta</a>
            </form>
        </div>
    </div>
</main>
<?php require_once 'includes/footer.php'; ?>