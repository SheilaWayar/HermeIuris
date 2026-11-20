<?php
require_once __DIR__ . '/Database.php';

class Curso
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::conectar();
    }

    /** Busca cursos activos por título o por nombre del área. */
    public function buscar(string $q = ''): array
    {
        // Escapa los comodines de LIKE para buscar "%" y "_" literalmente
        $like = '%' . addcslashes($q, '%_\\') . '%';

        $sql = "SELECT c.id_curso, c.titulo, c.descripcion, c.imagen_url, a.nombre AS area
                FROM cursos c
                LEFT JOIN areas_derecho a ON a.id_area = c.id_area
                WHERE c.activo = 1 AND (c.titulo LIKE :q1 OR a.nombre LIKE :q2)
                ORDER BY c.titulo
                LIMIT 50";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([':q1' => $like, ':q2' => $like]);
        return $stmt->fetchAll();
    }

    /** Devuelve un curso activo por id, o null si no existe. */
    public function obtenerPorId(int $id): ?array
    {
        $sql = "SELECT c.id_curso, c.titulo, c.descripcion, c.imagen_url, a.nombre AS area
                FROM cursos c
                LEFT JOIN areas_derecho a ON a.id_area = c.id_area
                WHERE c.id_curso = :id AND c.activo = 1";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        $curso = $stmt->fetch();

        return $curso ?: null;
    }
}