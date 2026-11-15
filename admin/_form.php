<?php
/**
 * Formulario compartido por crear.php y editar.php.
 * Variables esperadas: $modo ('crear' | 'editar'), $datos, $errores, $categorias, $usuarios
 */
$faltan_datos = empty($categorias) || empty($usuarios);
?>
<?php if ($faltan_datos): ?>
    <div class="alert alert-warning">
        Necesitás al menos una categoría y un usuario cargados en la base.
        Ejecutá la sección CREATE de <code>tp6/consultas.sql</code> en phpMyAdmin.
    </div>
<?php endif; ?>

<?php if ($errores): ?>
    <div class="alert alert-danger">
        <strong>Revisá los siguientes datos:</strong>
        <ul class="mb-0">
            <?php foreach ($errores as $mensaje): ?>
                <li><?= e($mensaje) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<form method="post" novalidate>
    <div class="mb-3">
        <label for="titulo" class="form-label">Título</label>
        <input type="text" id="titulo" name="titulo" maxlength="150"
               class="form-control <?= isset($errores['titulo']) ? 'is-invalid' : '' ?>"
               value="<?= e($datos['titulo']) ?>" required>
    </div>

    <div class="mb-3">
        <label for="contenido" class="form-label">Contenido</label>
        <textarea id="contenido" name="contenido" rows="6" maxlength="5000"
                  class="form-control <?= isset($errores['contenido']) ? 'is-invalid' : '' ?>"
                  required><?= e($datos['contenido']) ?></textarea>
    </div>

    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="id_categoria" class="form-label">Categoría</label>
            <select id="id_categoria" name="id_categoria"
                    class="form-select <?= isset($errores['id_categoria']) ? 'is-invalid' : '' ?>" required>
                <option value="">Elegí una categoría…</option>
                <?php foreach ($categorias as $c): ?>
                    <option value="<?= (int) $c['id_categoria'] ?>"
                        <?= (int) $datos['id_categoria'] === (int) $c['id_categoria'] ? 'selected' : '' ?>>
                        <?= e($c['nombre']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="col-md-4 mb-3">
            <label for="id_usuario" class="form-label">Autor</label>
            <select id="id_usuario" name="id_usuario"
                    class="form-select <?= isset($errores['id_usuario']) ? 'is-invalid' : '' ?>" required>
                <option value="">Elegí un autor…</option>
                <?php foreach ($usuarios as $u): ?>
                    <option value="<?= (int) $u['id_usuario'] ?>"
                        <?= (int) $datos['id_usuario'] === (int) $u['id_usuario'] ? 'selected' : '' ?>>
                        <?= e($u['nombre_completo']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <?php if ($modo === 'editar'): ?>
            <div class="col-md-4 mb-3">
                <label for="estado" class="form-label">Estado</label>
                <select id="estado" name="estado"
                        class="form-select <?= isset($errores['estado']) ? 'is-invalid' : '' ?>">
                    <?php foreach (['abierto', 'cerrado'] as $opcion): ?>
                        <option value="<?= e($opcion) ?>" <?= $datos['estado'] === $opcion ? 'selected' : '' ?>>
                            <?= e(ucfirst($opcion)) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
        <?php endif; ?>
    </div>

    <button type="submit" class="btn btn-gold" <?= $faltan_datos ? 'disabled' : '' ?>>
        <?= $modo === 'editar' ? 'Guardar cambios' : 'Crear tema' ?>
    </button>
    <a href="index.php" class="btn btn-outline-secondary">Cancelar</a>
</form>