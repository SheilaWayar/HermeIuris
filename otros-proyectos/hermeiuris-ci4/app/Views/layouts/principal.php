<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= esc($titulo ?? 'Herme Iuris') ?> | Herme Iuris</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-dark bg-dark mb-4">
        <div class="container">
            <a class="navbar-brand" href="<?= site_url('cursos') ?>">Herme Iuris · Módulo CodeIgniter</a>
        </div>
    </nav>
    <main class="container pb-5">
        <?= $this->renderSection('contenido') ?>
    </main>
</body>
</html>