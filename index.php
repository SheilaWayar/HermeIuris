<?php
$titulo_pagina = "Inicio";
require_once 'includes/header.php';

$areas = [
    ['⚖️', 'Derecho Civil', 'Relaciones entre particulares, contratos, alquileres y daños.', 'foro.php'],
    ['👷', 'Derecho Laboral', 'Derechos del trabajador, despidos, teletrabajo e indemnizaciones.', 'actualidad.php'],
    ['👨‍👩‍👧', 'Familia y Sucesiones', 'Divorcios, filiación, herencias y vínculos familiares.', 'cursos.php'],
    ['🏢', 'Derecho Comercial', 'Actividad empresarial, sociedades y contratos comerciales.', 'terminologia.php'],
];
$mas_areas = ['Penal', 'Constitucional', 'Procesal', 'Administrativo', 'Tributario', 'Consumidor', 'Ambiental', 'Informativo'];
$confianza = [
    ['🛡️', 'Contenido verificado', 'Fallos y fuentes revisadas'],
    ['👤', 'Pensado para vos', 'Lenguaje simple y claro'],
    ['⚖️', 'Jurisprudencia actual', 'Nacional y provincial'],
    ['🔒', 'Tus datos protegidos', 'Privacidad ante todo'],
];
?>
<main>
    <section class="hero">
        <div class="container">
            <div style="max-width:620px">
                <p class="eyebrow mb-3">Informado. Accesible. Para todos.</p>
                <h1 class="mb-4">Asesoramiento claro.<br><span>Derechos al alcance.</span></h1>
                <p class="mb-4 lead"><?= htmlspecialchars($nombre_sitio) ?> es un espacio donde el derecho deja de ser un lenguaje inaccesible y se convierte en una herramienta para comprender la vida en comunidad.</p>
                <a href="actualidad.php" class="btn btn-gold px-4 py-2 me-2">Ver actualidad</a>
                <a href="chatbot.php" class="btn btn-outline-light px-4 py-2 text-uppercase fw-semibold" style="font-size:.8rem">Consultar al chatbot</a>
            </div>
        </div>
    </section>

    <section class="bg-white">
        <div class="container">
            <div class="row g-0">
                <div class="col-lg-8 py-5 pe-lg-4">
                    <p class="eyebrow dark mb-3">Áreas del derecho</p>
                    <div class="row g-3">
                        <?php foreach ($areas as [$icono, $titulo, $desc, $link]): ?>
                            <div class="col-sm-6 col-xl-3">
                                <div class="card-ley area-card">
                                    <div class="icono" aria-hidden="true"><?= $icono ?></div>
                                    <h2 class="fs-5 mt-2"><?= $titulo ?></h2>
                                    <p class="small text-secondary"><?= $desc ?></p>
                                    <a href="<?= $link ?>" class="small fw-bold text-uppercase text-decoration-none" style="color:var(--gold-text)">Ver más →</a>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <div class="d-flex flex-wrap gap-2 mt-4">
                        <?php foreach ($mas_areas as $m): ?>
                            <a href="terminologia.php" class="tag text-decoration-none"><?= $m ?></a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <aside class="col-lg-4 py-5" aria-label="Hacé tu consulta">
                    <div class="aside-consulta">
                        <p class="eyebrow mb-3">Hacé tu consulta</p>
                        <form action="mailto:<?= htmlspecialchars($email_contacto) ?>" method="post" enctype="text/plain" class="d-grid gap-2">
                            <input type="text" class="form-control" name="nombre" placeholder="Nombre completo" aria-label="Nombre completo" required>
                            <input type="email" class="form-control" name="email" placeholder="Correo electrónico" aria-label="Correo electrónico" required>
                            <input type="tel" class="form-control" name="telefono" placeholder="Teléfono" aria-label="Teléfono">
                            <select class="form-select" name="area" aria-label="Área del derecho">
                                <option value="" selected disabled>Seleccioná un área</option>
                                <option>Civil</option><option>Laboral</option><option>Familia</option><option>Comercial</option><option>Otra</option>
                            </select>
                            <textarea class="form-control" name="mensaje" rows="4" placeholder="Tu mensaje" aria-label="Tu mensaje"></textarea>
                            <button type="submit" class="btn btn-gold py-2 mt-1">Enviar consulta</button>
                        </form>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <section class="trust-strip">
        <div class="container py-4">
            <div class="row g-3">
                <?php foreach ($confianza as [$icono, $titulo, $desc]): ?>
                    <div class="col-6 col-lg-3 d-flex align-items-center gap-3">
                        <span class="fs-3" aria-hidden="true"><?= $icono ?></span>
                        <div><p class="mb-0 fw-bold small"><?= $titulo ?></p><p class="mb-0 small opacity-75"><?= $desc ?></p></div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
</main>
<?php require_once 'includes/footer.php'; ?>
