<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// Controlador de iva de Medida Tienda Cel@g

require_once('../models/iva.model.php');
error_reporting(0);
$iva = new Iva;

switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todas las ivaes de medida
        $datos = array();
        $datos = $iva->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todas[] = $row;
        }
        echo json_encode($todas);
        break;

    case 'uno': // Procedimiento para obtener una iva de medida por ID
        if (!isset($_POST["idIva"])) {
            echo json_encode(["error" => "iva ID not specified."]);
            exit();
        }
        $idiva = intval($_POST["idIva"]);
        $datos = array();
        $datos = $iva->uno($idiva);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar una nueva iva de medida
        if (!isset($_POST["Detalle"]) || !isset($_POST["Estado"])|| !isset($_POST["Valor"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $Detalle = $_POST["Detalle"];
        $Estado = $_POST["Estado"];
        $Valor = $_POST["Valor"];

        $datos = array();
        $datos = $iva->insertar($Detalle, $Estado, $Valor);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar una iva de medida existente
        if (!isset($_POST["idIva"]) || !isset($_POST["Detalle"]) || !isset($_POST["Estado"])|| !isset($_POST["Valor"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idIva = intval($_POST["idIva"]);
        $Detalle = $_POST["Detalle"];
        $Estado = $_POST["Estado"];
        $Valor = $_POST["Valor"];

        $datos = array();
        $datos = $iva->actualizar($idIva,  $Detalle, $Estado,$Valor);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar una iva de medida
        if (!isset($_POST["idIva"])) {
            echo json_encode(["error" => "iva ID not specified."]);
            exit();
        }
        $idIva = intval($_POST["idIva"]);
        $datos = array();
        $datos = $iva->eliminar($idIva);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
