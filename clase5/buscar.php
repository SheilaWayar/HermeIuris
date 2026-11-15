<?php
require 'includes/funciones.php';
$titulo = 'Buscar';

$catalogo = ['Introducción a HTML5', 'CSS3 responsive', 'PHP: include y require',
             'Formularios con POST y GET', 'Seguridad web y XSS', 'Bases de datos MySQL'];

$q = '';
$error = '';
$resultados = [];
$buscado = isset($_GET['q']);

if ($buscado) {
    $q = get('q');

    if (empty($q)) {
        $error = 'Ingresá un término de búsqueda.';
    } elseif (strlen($q) < 2) {
        $error = 'Escribí al menos 2 caracteres.';
    } else {
        foreach ($catalogo as $item) {
            if (stripos($item, $q) !== false) {
                $resultados[] = $item;
            }
        }
    }
}

require 'includes/header.php';
?>

<h2>Buscador</h2>

<form action="buscar.php" method="get">
    <input type="search" name="q" value="<?= $q ?>">
    <button type="submit">Buscar</button>
</form>

<?php if ($buscado): ?>
    <?php if ($error): ?>
        <p style="color:red"><?= $error ?></p>
    <?php elseif (empty($resultados)): ?>
        <p>No hay resultados para «<?= $q ?>».</p>
    <?php else: ?>
        <p><?= count($resultados) ?> resultado(s) para «<?= $q ?>»:</p>
        <ul>
            <?php foreach ($resultados as $r): ?>
                <li><?= $r ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
<?php endif; ?>

<?php require 'includes/footer.php'; ?>