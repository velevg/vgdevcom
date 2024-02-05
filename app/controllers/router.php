<?php

// require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
require '../vendor/autoload.php'; //localhost

$router = new AltoRouter();

// $router->setBasePath('');
$router->setBasePath('/vgdevcom');

$smarty = new Smarty();
// $isLocalhost = (strpos($_SERVER['SERVER_NAME'], 'localhost') !== false || strpos($_SERVER['HTTP_HOST'], 'localhost') !== false);

// $rootPath = $isLocalhost ? realpath(__DIR__ . '/..') : realpath(__DIR__ . '/../..');
// $publicPath = $isLocalhost ? $rootPath . '/public' : $rootPath . '/public';
// $assetsPath = $publicPath . '/assets';

// if ($isLocalhost) {
//     echo "Running on localhost";
// } else {
//     echo "Running on a server";
// }

// $smarty->assign('rootPath', $rootPath);

// echo "<br>";

// echo "Root path of the app: $rootPath<br>";
// echo "Public path: $publicPath<br>";
// echo "Assets path: $assetsPath<br>";

$router->map('GET', '/', function() use ($smarty) {
    $smarty->setTemplateDir('../app/views/client');
    $smarty->setCompileDir('../cache/');
    require('../app/controllers/client/home.php');
});

$router->map('GET', '/admin', function() use ($smarty) {
    $smarty->setTemplateDir('../app/views/admin');
    $smarty->setCompileDir('../cache/');
    require('../app/controllers/admin/home.php');
});

$match = $router->match();

if ($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
} else {
    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}