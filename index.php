<?php
$titulo_pagina = "Inicio";
require_once 'includes/header.php';

// Áreas del derecho: [nombre, descripción corta, URL de la foto ('' = fondo degradado)]
$u = 'https://images.unsplash.com/';
$areas = [
    ['Civil',          'Relaciones entre particulares',   $u . 'photo-1589829545856-d10d557cf95f?w=600'],
    ['Penal',          'Delitos y sanciones',             $u . 'photo-1521791136064-7986c2920216?w=600'],
    ['Laboral',        'Derechos del trabajador',         $u . 'photo-1521790361543-f645cf042ec4?w=600'],
    ['Comercial',      'Actividad empresarial',           $u . 'photo-1507679799987-c73779587ccf?w=600'],
    ['Familia',        'Vínculos familiares y filiación', 'https://unsplash.com/photos/HV2My97JHA0/download?force=true&w=600'],
    ['Constitucional', 'Derechos y garantías',            $u . 'photo-1589996448606-27d38c2a2bc0?w=600'],
    ['Procesal',       'Procedimientos judiciales',      'https://unsplash.com./es/fotos/escena-del-crimen-de-halloween-de-cuerpo-en-el-suelo-y-nina-cerca-de-el-7PvU-ZShea4' ],
    ['Tributario',     'Impuestos y finanzas públicas',   $u . 'photo-1554224155-6726b3ff858f?w=600'],
    ['Consumidor',     'Defensa del consumidor',          $u . 'photo-1521737711867-e3b97375f902?w=600'],
    ['Ambiental',      'Medio ambiente y recursos',       $u . 'photo-1441974231531-c6227db76b6e?w=600'],
    ['Informativo',    'Novedades y actualidad',          $u . 'photo-1504711434969-e33886168f5c?w=600'],
];

$accesos = [
    ['📰', 'Últimas noticias', 'Fallos y análisis recientes', 'actualidad.php'],
    ['💬', 'Foro de debate',   'Participá en la discusión',   'foro.php'],
    ['📚', 'Cursos gratuitos', 'Aprendé sobre tus derechos',  'cursos.php'],
    ['🤖', 'Chatbot legal',    'Consultá dudas al instante',  'chatbot.php'],
];

$glosario = [
    'Acción'        => 'Derecho de acudir ante un juez para pedir protección.',
    'Allanamiento'  => 'Ingreso autorizado por un juez a un domicilio.',
    'Cautelar'      => 'Medida preventiva para proteger un derecho.',
    'Demanda'       => 'Escrito que inicia un proceso judicial.',
    'Fuero'         => 'Jurisdicción competente según la materia.',
    'Hábeas Corpus' => 'Garantía para proteger la libertad personal.',
];
?>
<main>
    <!-- HERO -->
    <section class="hero">
        <div class="container">
            <div style="max-width:760px">
                <span class="hero-pill mb-4">Derecho para todos</span>
                <h1 class="mb-4"><?= htmlspecialchars($nombre_sitio) ?> es un espacio donde el derecho deja de ser un lenguaje inaccesible y se convierte en una herramienta para comprender la vida en comunidad.</h1>
                <p class="mb-4 lead">Aquí no importa si sos abogado o ciudadano común: todos tienen derecho a entender cómo las leyes impactan en nuestra sociedad. Queremos que te sientas acompañado, identificado y con voz en cada debate.</p>
                <a href="actualidad.php" class="btn btn-gold px-4 py-2 me-2">Ver actualidad</a>
                <a href="chatbot.php" class="btn btn-outline-light px-4 py-2 text-uppercase fw-semibold" style="font-size:.8rem">Consultar al chatbot</a>
            </div>
        </div>
    </section>

    <!-- 3 COLUMNAS: Mi Cuenta | Áreas | Diccionario -->
    <section class="container-xxl py-5">
        <div class="row g-4">

            <!-- Columna izquierda: Mi Cuenta -->
            <aside class="col-xl-3 order-2 order-xl-1" aria-label="Mi cuenta">
                <div class="panel">
                    <div class="panel-head"><h2 class="fs-5 mb-0">Mi Cuenta</h2></div>
                    <div class="p-3">
                        <ul class="nav nav-pills nav-fill mb-3 pills-cuenta" role="tablist">
                            <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#home-ingresar" type="button">Ingresar</button></li>
                            <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#home-registro" type="button">Registrarse</button></li>
                        </ul>
                        <div class="tab-content">
                            <form class="tab-pane fade show active d-grid gap-3" id="home-ingresar">
                                <input class="form-control" placeholder="Email o teléfono" aria-label="Email o teléfono">
                                <input class="form-control" type="password" placeholder="Contraseña" aria-label="Contraseña">
                                <button type="button" class="btn btn-navy py-2">Acceder</button>
                                <a href="cuenta.php" class="small text-center" style="color:var(--gold-text)">¿Olvidaste tu contraseña?</a>
                            </form>
                            <form class="tab-pane fade d-grid gap-3" id="home-registro">
                                <input class="form-control" placeholder="Nombre completo" aria-label="Nombre completo">
                                <input class="form-control" type="email" placeholder="Email" aria-label="Email">
                                <input class="form-control" type="password" placeholder="Contraseña" aria-label="Contraseña">
                                <button type="button" class="btn btn-navy py-2">Crear cuenta</button>
                            </form>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Columna central: Áreas del Derecho + accesos -->
            <div class="col-xl-6 order-1 order-xl-2">
                <h2 class="titulo-dorado mb-3">Áreas del Derecho</h2>
                <div class="row g-3 mb-4">
                    <?php foreach ($areas as [$nombre, $desc, $foto]): ?>
                        <div class="col-6 col-md-3">
                            <a href="terminologia.php" class="area-foto text-decoration-none">
                                <div class="area-img" style="background-image: <?= $foto ? "url('" . htmlspecialchars($foto) . "'), " : '' ?>linear-gradient(135deg, #2a4a7c, #0F2342);">
                                    <span class="area-nombre"><?= htmlspecialchars($nombre) ?></span>
                                </div>
                                <div class="area-desc"><?= htmlspecialchars($desc) ?></div>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>

                <div class="row g-3">
                    <?php foreach ($accesos as [$icono, $titulo, $desc, $link]): ?>
                        <div class="col-md-6">
                            <a href="<?= $link ?>" class="acceso text-decoration-none">
                                <h3 class="fs-5 mb-1"><span aria-hidden="true"><?= $icono ?></span> <?= $titulo ?></h3>
                                <p class="mb-0 small"><?= $desc ?></p>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Columna derecha: Diccionario Jurídico -->
            <aside class="col-xl-3 order-3" aria-label="Diccionario jurídico">
                <div class="panel">
                    <div class="panel-head"><h2 class="fs-5 mb-0"><span aria-hidden="true">📖</span> Diccionario Jurídico</h2></div>
                    <div class="p-3">
                        <input type="search" id="buscar-termino" class="form-control mb-3" placeholder="Buscar término..." aria-label="Buscar término">
                        <div class="d-grid gap-3">
                            <?php foreach ($glosario as $termino => $def): ?>
                                <div>
                                    <div class="glosario-item" data-termino="<?= htmlspecialchars($termino) ?>">
                                        <strong style="color:var(--gold-text)"><?= htmlspecialchars($termino) ?></strong>
                                        <p class="small mb-0"><?= htmlspecialchars($def) ?></p>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        <a href="terminologia.php" class="btn-ver-glosario mt-3">Ver glosario completo →</a>
                    </div>
                </div>
            </aside>

        </div>
    </section>
</main>
<?php require_once 'includes/footer.php'; ?>