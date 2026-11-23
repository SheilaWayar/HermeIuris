<?php $base = $base ?? ''; ?>
<footer class="site-footer mt-5">
    <div class="container py-5">
        <div class="row g-4">
            <div class="col-lg-5">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="logo-h">H</span>
                    <span class="brand-name"><?= htmlspecialchars(APP_NAME) ?></span>
                </div>
                <p class="mb-4 footer-lema">El derecho explicado para todos. Un espacio para entender, debatir y construir justicia juntos.</p>
                <div class="d-flex gap-2">
                    <a href="#" class="social-ico" aria-label="Instagram">📷</a>
                    <a href="#" class="social-ico" aria-label="Comentarios">💬</a>
                    <a href="#" class="social-ico" aria-label="Comunidad">👥</a>
                    <a href="#" class="social-ico" aria-label="Novedades">🐦</a>
                </div>
            </div>
            <div class="col-6 col-lg-2">
                <h6>Secciones</h6>
                <ul class="list-unstyled footer-links">
                    <li><a href="<?= $base ?>index.php">Home</a></li>
                    <li><a href="<?= $base ?>actualidad.php">Actualidad</a></li>
                    <li><a href="<?= $base ?>foro.php">Foro</a></li>
                    <li><a href="<?= $base ?>cuenta.php">Mi Cuenta</a></li>
                </ul>
            </div>
            <div class="col-6 col-lg-2">
                <h6>Recursos</h6>
                <ul class="list-unstyled footer-links">
                    <li><a href="<?= $base ?>cursos.php">Cursos</a></li>
                    <li><a href="<?= $base ?>terminologia.php">Terminología</a></li>
                    <li><a href="<?= $base ?>chatbot.php">Chatbot</a></li>
                    <li><a href="<?= $base ?>jurisprudencia.php">Jurisprudencia</a></li>
                    <li><a href="<?= $base ?>clase5/buscar.php">Buscador</a></li>
                </ul>
            </div>
            <div class="col-6 col-lg-3">
                <h6>Legal</h6>
                <ul class="list-unstyled footer-links">
                    <li><a href="#">Aviso legal</a></li>
                    <li><a href="#">Privacidad</a></li>
                    <li><a href="#">Términos de uso</a></li>
                    <li><a href="<?= $base ?>clase5/contacto.php">Contacto</a></li>
                </ul>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column flex-md-row justify-content-between gap-2 small footer-bottom">
            <span>&copy; <?= date('Y') ?> <?= htmlspecialchars(APP_NAME) ?>. Todos los derechos reservados.</span>
            <span>El contenido de este sitio es orientativo y no constituye asesoramiento legal.</span>
        </div>
    </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="<?= $base ?>js/main.js"></script>
</body>
</html>