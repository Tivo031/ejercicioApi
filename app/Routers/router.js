let express = require("express");
let router = express.Router();

////Usuario
const usuarios = require("../Controllers/usuarios.controller.js");
router.post("/usuarios/CrearUsuario", usuarios.CrearUsuario);
router.get("/usuarios/obtenerTodos", usuarios.retrieveAllUsuario);
router.get("/usuarios/obtenerUsuario/:idUsuario", usuarios.ObtenerUsuarioId);
router.put("/usuarios/actualizarUsuario/:idUsuario", usuarios.ActualizarUsuario);
router.delete("/usuarios/eliminarUsuario/:idUsuario", usuarios.EliminarUsuario);

////Proyectos
const proyectos = require("../Controllers/proyectos.controller.js");
router.post("/proyectos/crearProyectos", proyectos.CrearProyectos);
router.get("/proyectos/obtenerTodos", proyectos.retrieveAllProyectos);
router.get("/proyectos/obtenerporid/:idProyecto", proyectos.ObtenerProyectosId);
router.put("/proyectos/actualizarProyectos/:idProyecto", proyectos.ActualizarProyectos);
router.delete("/proyectos/eliminarProyectos/:idProyecto", proyectos.EliminarProyectos);

////Tareas
const tareas = require("../Controllers/tareas.controller.js");
router.post("/tareas/crearTarea", tareas.CrearTareas);
router.get("/tareas/obtenerTodos", tareas.retrieveAllTareas);
router.get("/tareas/obtenerporid/:idTarea", tareas.ObtenerTareasId);
router.put("/tareas/actualizarTarea/:idTarea", tareas.ActualizarTareas);
router.delete("/tareas/eliminarTarea/:idTarea", tareas.EliminarTareas);



module.exports = router;
