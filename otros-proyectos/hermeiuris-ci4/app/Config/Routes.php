<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
// Módulo de cursos
$routes->get('cursos', 'Cursos::index');
$routes->get('cursos/(:num)', 'Cursos::ver/$1');
$routes->get('api/cursos', 'Cursos::api');
