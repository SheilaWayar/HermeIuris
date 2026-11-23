<?php
require_once __DIR__ . '/includes/funciones.php';

$base = '../';                       // el header/nav/footer del sitio están una carpeta arriba
$titulo_pagina = 'Buscador';
$descripcion_pagina = 'Buscá contenidos dentro de Herme Iuris.';

// Catálogo de ejemplo (en el proyecto real puede reemplazarse por datos de BD)
$catalogo = [
    ['titulo' => 'Introducción a HTML5',          'categoria' => 'Frontend'],
    ['titulo' => 'CSS3 y diseño responsive',       'categoria' => 'Frontend'],
    ['titulo' => 'JavaScript desde cero',          'categoria' => 'Frontend'],
    ['titulo' => 'PHP: sintaxis y estructuras',    'categoria' => 'Backend'],
    ['titulo' => 'PHP: include y require (SSI)',   'categoria' => 'Backend'],
    ['titulo' => 'Formularios con POST y GET',     'categoria' => 'Backend'],
    ['titulo' => 'Seguridad web y XSS (OWASP)',    'categoria' => 'Seguridad'],
    ['titulo' => 'Sanitización de entradas en PHP','categoria' => 'Seguridad'],
    ['titulo' => 'Git y GitHub para equipos',      'categoria' => 'Herramientas'],
    ['titulo' => 'Bases de datos con MySQL',       'categoria' => 'Backend'],
];
$categorias = ['Frontend', 'Backend', 'Seguridad', 'Herramientas'];

$q          = '';   // término buscado (sanitizado)
$cat        = '';   // categoría elegida (sanitizada)
$errores    = [];
$errorQ     = false;
$buscado    = false;
$resultados = [];

// El formulario GET se considera enviado si llega el parámetro "q"
if (isset($_GET['q'])) {
    $buscado = true;
    $q   = get('q');
    $cat = get('categoria');

    if (empty($q)) {
        $errores[] = 'Ingresá un término de búsqueda.';
    } elseif (mb_strlen($q) < 2) {
        $errores[] = 'El término debe tener al menos 2 caracteres.';
    } elseif (mb_strlen($q) > 50) {
        $errores[] = 'El término no puede superar los 50 caracteres.';
    }

    $errorQ = !empty($errores);

    // La categoría debe ser una de las permitidas (lista blanca)
    if ($cat !== '' && !in_array($cat, $categorias, true)) {
        $errores[] = 'La categoría seleccionada no es válida.';
        $cat = '';
    }

    if (empty($errores)) {
        $termino = mb_strtolower(html_entity_decode($q, ENT_QUOTES, 'UTF-8'));
        foreach ($catalogo as $item) {
            $coincideTexto = mb_strpos(mb_strtolower($item['titulo']), $termino) !== false;
            $coincideCat   = ($cat === '' || $item['categoria'] === $cat);
            if ($coincideTexto && $coincideCat) {
                $resultados[] = $item;
            }
        }
    }
}

require_once __DIR__ . '/../includes/header.php';
?>

<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <p class="eyebrow mb-1">Explorá</p>
            <h1 class="mb-2">Buscador de contenidos</h1>
            <p class="text-muted mb-4">Buscá por palabra clave y, si querés, filtrá por categoría. <span class="small">(Método GET)</span></p>

            <div class="card-ley p-4 mb-4">
                <form action="buscar.php" method="get" novalidate>
                    <div class="row g-3 align-items-end">
                        <div class="col-md-6">
                            <label for="q" class="form-label">Término de búsqueda</label>
                            <input type="search" id="q" name="q" class="form-control <?= $errorQ ? 'is-invalid' : '' ?>" value="<?= $q ?>">
                        </div>
                        <div class="col-md-4">
                            <label for="categoria" class="form-label">Categoría</label>
                            <select id="categoria" name="categoria" class="form-select">
                                <option value="">Todas</option>
                                <?php foreach ($categorias as $c): ?>
                                    <option value="<?= $c ?>" <?= $cat === $c ? 'selected' : '' ?>><?= $c ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-md-2 d-grid">
                            <button type="submit" class="btn btn-gold py-2">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>

            <?php if ($buscado): ?>
                <?php if (!empty($errores)): ?>
                    <div class="alerta alerta-error" role="alert">
                        <strong>Error de validación:</strong>
                        <ul>
                            <?php foreach ($errores as $error): ?>
                                <li><?= $error ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php elseif (empty($resultados)): ?>
                    <div class="alerta alerta-error" role="status">
                        No se encontraron resultados para «<?= $q ?>»<?= $cat !== '' ? ' en la categoría ' . $cat : '' ?>.
                    </div>
                <?php else: ?>
                    <div class="card-ley p-4">
                        <p class="mb-0">Se encontraron <strong><?= count($resultados) ?></strong> resultado(s) para «<?= $q ?>».</p>
                        <ul class="resultados">
                            <?php foreach ($resultados as $r): ?>
                                <li><?= $r['titulo'] ?><br><small><?= $r['categoria'] ?></small></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>