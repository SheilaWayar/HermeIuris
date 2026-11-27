<?php
$q = $_GET['q'] ?? '';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscador</title>
</head>
<body>

<h1>Buscador</h1>

<form method="GET">
    <input type="text" name="q" value="<?= htmlspecialchars($q) ?>" placeholder="Buscar...">
    <button type="submit">Buscar</button>
</form>

<?php if($q): ?>
    <p>Resultados para: <strong><?= htmlspecialchars($q) ?></strong></p>
<?php endif; ?>

</body>
</html>