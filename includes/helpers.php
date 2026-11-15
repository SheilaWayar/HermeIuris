<?php
/**
 * Funciones auxiliares del módulo de administración (TP N.º 7).
 * Importante: los datos se guardan SIN escapar; el escape (e()) se hace al IMPRIMIR.
 */

if (!function_exists('e')) {
    /** Escapa un valor para imprimirlo en HTML (protección XSS). */
    function e($valor): string
    {
        return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
    }
}

/** Devuelve un campo de $_POST como texto sin espacios sobrantes ('' si no es texto). */
function post_texto(string $campo): string
{
    $valor = $_POST[$campo] ?? '';
    return is_string($valor) ? trim($valor) : '';
}

/** Categorías del foro para los <select>. */
function obtener_categorias(PDO $pdo): array
{
    $stmt = $pdo->prepare('SELECT id_categoria, nombre FROM categorias_foro ORDER BY nombre');
    $stmt->execute();
    return $stmt->fetchAll();
}

/** Usuarios para el <select> de autor. */
function obtener_usuarios(PDO $pdo): array
{
    $stmt = $pdo->prepare(
        "SELECT id_usuario, CONCAT(nombre, ' ', apellido) AS nombre_completo
         FROM usuarios
         ORDER BY apellido, nombre"
    );
    $stmt->execute();
    return $stmt->fetchAll();
}

/**
 * Valida los datos de un tema. Devuelve un arreglo campo => mensaje (vacío si todo está bien).
 * Las claves foráneas se comparan contra las listas que vienen de la base (lista blanca).
 */
function validar_tema(array $d, array $categorias, array $usuarios, bool $validar_estado = false): array
{
    $errores = [];

    $largo = mb_strlen($d['titulo']);
    if ($largo < 5 || $largo > 150) {
        $errores['titulo'] = 'El título debe tener entre 5 y 150 caracteres.';
    }

    $largo = mb_strlen($d['contenido']);
    if ($largo < 10 || $largo > 5000) {
        $errores['contenido'] = 'El contenido debe tener entre 10 y 5000 caracteres.';
    }

    $ids_categoria = array_map('intval', array_column($categorias, 'id_categoria'));
    if (!in_array($d['id_categoria'], $ids_categoria, true)) {
        $errores['id_categoria'] = 'Elegí una categoría válida.';
    }

    $ids_usuario = array_map('intval', array_column($usuarios, 'id_usuario'));
    if (!in_array($d['id_usuario'], $ids_usuario, true)) {
        $errores['id_usuario'] = 'Elegí un autor válido.';
    }

    if ($validar_estado && !in_array($d['estado'], ['abierto', 'cerrado'], true)) {
        $errores['estado'] = 'El estado debe ser abierto o cerrado.';
    }

    return $errores;
}