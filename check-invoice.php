<?php
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
//header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

$DIR = dirname(__FILE__);
require_once implode(DIRECTORY_SEPARATOR, [$DIR, 'vendor', 'autoload.php']);


$config = include('settings.php');
try {
    $orderObject = new PlisioOrderRepository($config['dsn'], $config['db_username'], $config['db_password']);
} catch (PDOException $e) {
    die($e->getMessage());
}

$plisioSecretKey = $config['secret_key'];
$client = new \Plisio\ClientAPI($plisioSecretKey);

if ($_GET['page'] === 'invoice' && isset($_GET['invoice_id']) && !empty($_GET['invoice_id'])) {
    $order = $orderObject->get($_GET['invoice_id']);

    $order['expire_utc'] = (new DateTime($order['expire_utc']))->getTimestamp() * 1000;
    if (!empty($order['tx_urls'])) {
        try {
            $txUrl = json_decode($order['tx_urls']);
            if (!empty($txUrl)) {
                $txUrl = gettype($txUrl) === 'string' ? $txUrl : $txUrl[count($txUrl) - 1];
                $order['txUrl'] = $txUrl;
            }
        } catch (Exception $e) {
            //TODO: log error $e
            return;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($order);
    die();
}
