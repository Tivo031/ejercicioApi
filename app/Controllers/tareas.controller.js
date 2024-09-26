const db = require('../Config/db.config.js');
const Tareas = db.Tareas;

exports.CrearTareas = (req, res) => {
  let tareas = {};

  try {
    tareas.proyectoId = req.body.proyectoId;
    tareas.nombre = req.body.nombre;
    tareas.estado = req.body.estado;
    tareas.fechaCreacion = req.body.fechaCreacion;
    tareas.fechaVencimiento = req.body.fechaVencimiento;

    Tareas.create(tareas).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idTarea}`,
        tareas: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllTareas = (req, res) => {
  Tareas.findAll()
    .then(tareasInfo => {
      res.status(200).json({
        message: "Tareas recuperadas exitosamente!",
        tareas: tareasInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Tareas!",
        error: error.message
      });
    });
};

exports.ObtenerTareasId = (req, res) => {
  let tareasId = req.params.idUsuario;
  Tareas.findByPk(tareasId)
    .then(tareas => {
      if (tareas) {
        res.status(200).json({
          message: `Tareas obtenida con id = ${tareasId}`,
          tareas: tareas
        });
      } else {
        res.status(404).json({
          message: `No se encontró la Tareas con id = ${tareasId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener la Tareas",
        error: error.message
      });
    });
};

exports.ActualizarTareas = async (req, res) => {
  try {
    let tareasId = req.params.idTarea;
    let tareas = await Tareas.findByPk(tareasId);

    if (!tareas) {
      res.status(404).json({
        message: `No fue posible actualizar el usuario con id = ${tareasId}`,
        tareas: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        proyectoId: req.body.proyectoId,
        nombre: req.body.nombre,
        estado: req.body.estado,
        fechaCreacion: req.body.fechaCreacion,
        fechaVencimiento: req.body.fechaVencimiento
      };
      let result = await Tareas.update(updatedObject, { returning: true, where: { id: tareasId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar las Tareas con id = " + req.params.idTarea,
          error: "Can NOT Updated"
        });
      }
      res.status(200).json({
        message: `Tareas actualizadas con éxito, id = ${tareasId}`,
        tareas: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar la tarea con id = " + req.params.idTarea,
      error: error.message
    });
  }
};

exports.EliminarTareas = async (req, res) => {
  try {
    let tareasId = req.params.idTarea;
    let tareas = await Tareas.findByPk(tareasId);

    if (!tareas) {
      res.status(404).json({
        message: `No existe las tareas con id = ${tareasId}`,
        error: "404"
      });
    } else {
      await tareas.destroy();
      res.status(200).json({
        message: `tareas eliminadas con éxito, id = ${tareasId}`,
        tareas: tareas
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar las tareas con id = " + req.params.idTarea,
      error: error.message
    });
  }
};