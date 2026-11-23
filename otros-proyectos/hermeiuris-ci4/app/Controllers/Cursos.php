<?php

namespace App\Controllers;

use App\Models\CursoModel;
use CodeIgniter\Exceptions\PageNotFoundException;

class Cursos extends BaseController
{
    /** GET /cursos?q=texto  → listado HTML */
    public function index()
    {
        $q = $this->request->getGet('q');
        $q = is_string($q) ? trim($q) : '';

        $datos = [
            'titulo' => 'Cursos',
            'q'      => $q,
            'cursos' => (new CursoModel())->buscarActivos($q),
        ];

        return view('cursos/index', $datos);
    }

    /** GET /cursos/1  → detalle HTML */
    public function ver(int $id)
    {
        $curso = (new CursoModel())->obtenerActivo($id);

        if ($curso === null) {
            throw PageNotFoundException::forPageNotFound('Curso no encontrado');
        }

        return view('cursos/ver', ['titulo' => $curso['titulo'], 'curso' => $curso]);
    }

    /** GET /api/cursos?q=texto  → JSON */
    public function api()
    {
        $q = $this->request->getGet('q');

        if ($q !== null && !is_string($q)) {
            return $this->response->setStatusCode(400)->setJSON(['error' => 'El parámetro q debe ser texto.']);
        }
        $q = trim((string) $q);
        if (mb_strlen($q) > 100) {
            return $this->response->setStatusCode(400)->setJSON(['error' => 'El parámetro q no puede superar los 100 caracteres.']);
        }

        $cursos = (new CursoModel())->buscarActivos($q);

        return $this->response->setJSON(['total' => count($cursos), 'cursos' => $cursos]);
    }
}