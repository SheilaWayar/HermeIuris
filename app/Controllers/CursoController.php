<?php
require_once __DIR__ . '/../Models/Curso.php';

class CursoController
{
    /** Página con el buscador (el listado lo completa el JS vía la API). */
    public function index(): void
    {
        $titulo_pagina = 'Cursos';
        require __DIR__ . '/../Views/cursos/index.php';
    }

    /** Página de detalle de un curso: curso.php?id=1 */
    public function detalle(): void
    {
        $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
        $curso = null;
        $errorBd = false;

        if ($id) {
            try {
                $curso = (new Curso())->obtenerPorId($id);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                $errorBd = true;
            }
        }

        if (!$curso && !$errorBd) {
            http_response_code(404);
        }

        $titulo_pagina = $curso['titulo'] ?? 'Curso';
        require __DIR__ . '/../Views/cursos/detalle.php';
    }

    /** Endpoint JSON: api/buscar_cursos.php?q=texto */
    public function api(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        ini_set('display_errors', '0');

        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            header('Allow: GET');
            $this->json(405, ['error' => 'Método no permitido. Usá GET.']);
        }

        $q = $_GET['q'] ?? '';
        if (!is_string($q)) {
            $this->json(400, ['error' => 'El parámetro q debe ser texto.']);
        }
        $q = trim($q);
        if (mb_strlen($q) > 100) {
            $this->json(400, ['error' => 'El parámetro q no puede superar los 100 caracteres.']);
        }

        try {
            $cursos = (new Curso())->buscar($q);
            $this->json(200, ['total' => count($cursos), 'cursos' => $cursos]);
        } catch (Throwable $e) {
            error_log($e->getMessage());
            $this->json(500, ['error' => 'Error al consultar la base de datos.']);
        }
    }

    private function json(int $codigo, array $datos): void
    {
        http_response_code($codigo);
        echo json_encode($datos, JSON_UNESCAPED_UNICODE);
        exit;
    }
}