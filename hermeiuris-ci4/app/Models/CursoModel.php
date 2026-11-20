<?php

namespace App\Models;

use CodeIgniter\Model;

class CursoModel extends Model
{
    protected $table         = 'cursos';
    protected $primaryKey    = 'id_curso';
    protected $returnType    = 'array';
    protected $allowedFields = ['id_area', 'titulo', 'descripcion', 'imagen_url', 'activo'];
    protected $useTimestamps = false;

    /** Cursos activos, opcionalmente filtrados por título o área. */
    public function buscarActivos(?string $q = null): array
    {
        $this->select('cursos.id_curso, cursos.titulo, cursos.descripcion, cursos.imagen_url, areas_derecho.nombre AS area')
             ->join('areas_derecho', 'areas_derecho.id_area = cursos.id_area', 'left')
             ->where('cursos.activo', 1);

        if ($q !== null && $q !== '') {
            $this->groupStart()
                    ->like('cursos.titulo', $q)
                    ->orLike('areas_derecho.nombre', $q)
                 ->groupEnd();
        }

        return $this->orderBy('cursos.titulo')->findAll(50);
    }

    /** Un curso activo por id, o null. */
    public function obtenerActivo(int $id): ?array
    {
        return $this->select('cursos.id_curso, cursos.titulo, cursos.descripcion, cursos.imagen_url, areas_derecho.nombre AS area')
                    ->join('areas_derecho', 'areas_derecho.id_area = cursos.id_area', 'left')
                    ->where('cursos.activo', 1)
                    ->where('cursos.id_curso', $id)
                    ->first();
    }
}