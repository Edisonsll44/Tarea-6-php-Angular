<?php
// Modelo de Iva
require_once('../config/config.php');

class Iva
{
    public function todos() // select * from iva
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `iva`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idIva) // select * from iva where id = $idIva
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `iva` WHERE `idIva` = $idIva";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Detalle, $Estado, $Valor) // insert into iva (...) values (...)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `iva`( `Detalle`, `Estado`,`Valor`) 
                       VALUES ( '$Detalle', '$Estado',''$Valor'')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Retorna el ID insertado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idIva,  $Detalle, $Estado, $Valor) // update iva set ... where id = $idIva
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `iva` SET 
                      
                       `Detalle`='$Detalle',
                       `Estado`='$Estado',
                       `Valor`='$Valor'
                       WHERE `idIva` = $idIva";
            if (mysqli_query($con, $cadena)) {
                return $idIva; // Retorna el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idIva) // delete from iva where id = $idIva
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `iva` WHERE `idIva`= $idIva";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
