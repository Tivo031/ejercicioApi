let express = require("express");
let router = express.Router();

////Departamento
const departamento = require("../Controllers/departamento.controller.js");
router.post("/departamento/crearDepartamento", departamento.CrearDepartamento);
router.get("/departamento/obtenerTodos", departamento.retrieveAllDepartamento);
router.get("/departamento/obtenerporid/:idDepartamento", departamento.ObtenerDepartamentoId);
router.put("/departamento/actualizarDepartamento/:idDepartamento", departamento.ActualizarDepartamento);
router.delete("/departamento/eliminarDepartamento/:idDepartamento", departamento.EliminarDepartamento);

////Empleado
const empleado = require("../Controllers/empleado.controller.js");
router.post("/empleado/crearEmpleado", empleado.CrearEmpleado);
router.get("/empleado/obtenerTodos", empleado.retrieveAllEmpleado);
router.get("/empleado/obtenerEmpleado/:idEmpleado", empleado.ObtenerEmpleadoId);
router.put("/empleado/actualizarEmpleado/:idEmpleado", empleado.ActualizarEmpleado);
router.delete("/empleado/eliminarEmpleado/:idEmpleado", empleado.EliminarEmpleado);


module.exports = router;
