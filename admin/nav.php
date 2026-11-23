<?php
// Menú compartido de la zona de administración.
// Se incluye con: <?php require __DIR__ . '/_nav.php'; ?>
$pagina = basename($_SERVER['SCRIPT_NAME']);

$secciones = [
    'index.php'    => ['Temas del foro', ['index.php', 'crear.php', 'editar.php']],
    'usuarios.php' => ['Usuarios',       ['usuarios.php', 'usuario.php']],
];
?>
<nav class="mb-4" aria-label="Administración">
    <ul class="nav nav-pills">
        <?php foreach ($secciones as $archivo => [$texto, $paginas]): ?>
            <li class="nav-item">
                <a class="nav-link <?= in_array($pagina, $paginas, true) ? 'active' : '' ?>"
                   href="<?= htmlspecialchars($archivo, ENT_QUOTES, 'UTF-8') ?>">
                    <?= htmlspecialchars($texto, ENT_QUOTES, 'UTF-8') ?>
                </a>
            </li>
        <?php endforeach; ?>
        <li class="nav-item ms-auto">
            <a class="nav-link" href="../panel.php">← Volver al sitio</a>
        </li>
    </ul>
</nav>