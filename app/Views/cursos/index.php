<?php require_once __DIR__ . '/../../../includes/header.php'; ?>
<main class="container py-5">
    <p class="eyebrow dark mb-1">Formación</p>
    <h1 class="mb-1">Cursos de Derecho</h1>
    <p class="text-secondary mb-4">Aprendé sobre tus derechos con contenido simple, claro y gratuito.</p>

    <section class="mb-4">
        <label for="inputBusqueda" class="form-label">Buscar cursos</label>
        <input type="search" id="inputBusqueda" class="form-control mb-3"
               placeholder="Escribí un título o un área (ej: civil)..." autocomplete="off">
        <div id="resultados" aria-live="polite"></div>
    </section>
</main>
<script src="js/buscar_cursos.js"></script>
<?php require_once __DIR__ . '/../../../includes/footer.php'; ?>