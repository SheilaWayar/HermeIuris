<?php
function sanitizar(string $valor): string {
    return htmlspecialchars(trim($valor), ENT_QUOTES, 'UTF-8');
}

function post(string $campo): string {
    return isset($_POST[$campo]) ? sanitizar($_POST[$campo]) : '';
}

function get(string $campo): string {
    return isset($_GET[$campo]) ? sanitizar($_GET[$campo]) : '';
}