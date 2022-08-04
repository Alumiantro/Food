<?php
// если приходит json
$_POST = json_decode(file_get_contents('php://input'), true);
echo var_dump($_POST);
// берет данные от клиента, превращает их в строку, и показывает обратно от клиента
