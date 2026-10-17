<footer class="site-footer mt-5">
    <div class="container py-5">
        <div class="row g-4">
            <div class="col-lg-5">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="logo-h">H</span>
                    <span class="brand-name"><?= htmlspecialchars(APP_NAME) ?></span>
                </div>
                <p class="small mb-1">El derecho explicado para todos. Un espacio para entender, debatir y construir justicia juntos.</p>
                <p class="small mb-0">Contacto: <a href="mailto:<?= htmlspecialchars(APP_EMAIL) ?>"><?= htmlspecialchars(APP_EMAIL) ?></a></p>
            </div>
            <div class="col-6 col-lg-2">
                <h6>Secciones</h6>
                <ul class="list-unstyled small">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="actualidad.php">Actualidad</a></li>
                    <li><a href="foro.php">Foro</a></li>
                    <li><a href="cuenta.php">Mi Cuenta</a></li>
                </ul>
            </div>
            <div class="col-6 col-lg-2">
                <h6>Recursos</h6>
                <ul class="list-unstyled small">
                    <li><a href="cursos.php">Cursos</a></li>
                    <li><a href="terminologia.php">Terminología</a></li>
                    <li><a href="chatbot.php">Chatbot</a></li>
                    <li><a href="jurisprudencia.php">Jurisprudencia</a></li>
                </ul>
            </div>
            <div class="col-lg-3">
                <h6>Legal</h6>
                <p class="small">El contenido de este sitio es orientativo y no constituye asesoramiento legal.</p>
            </div>
        </div>
        <hr>
        <p class="small mb-0">&copy; <?= date('Y') ?> <?= htmlspecialchars(APP_NAME) ?>. Todos los derechos reservados.
            <?php if (APP_ENV === 'local'): ?><span class="badge text-bg-warning ms-2">entorno: <?= APP_ENV ?></span><?php endif; ?>
        </p>
    </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
