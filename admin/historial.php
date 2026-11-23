<?php
/**
 * Registra un evento en el historial de un usuario (registro, login, login_fallido, logout).
 * Si falla el guardado, no interrumpe el flujo de la aplicación.
 */
function registrar_evento(PDO $pdo, ?int $id_usuario, string $evento): void
{
    try {
        $stmt = $pdo->prepare(
            'INSERT INTO historial_accesos (id_usuario, evento, ip, user_agent)
             VALUES (:id, :evento, :ip, :ua)'
        );
        $stmt->execute([
            ':id'     => $id_usuario,
            ':evento' => $evento,
            ':ip'     => $_SERVER['REMOTE_ADDR'] ?? null,
            ':ua'     => mb_substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255),
        ]);
    } catch (PDOException $e) {
        error_log('No se pudo registrar el evento de historial: ' . $e->getMessage());
    }
}