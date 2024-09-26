const db = require('../Config/db.config.js');
const Proyectos = db.Proyectos;

exports.CrearProyectos = (req, res) => {
  let proyectos = {};

  try {
    proyectos.usuarioId = req.body.usuarioId;
    proyectos.nombre = req.body.nombre;
    proyectos.descripcion = req.body.descripcion;
    proyectos.fechaRegistro = req.body.fechaRegistro;

    Proyectos.create(proyectos).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idProyecto}`,
        proyectos: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllProyectos = (req, res) => {
  Proyectos.findAll()
    .then(proyectosInfo => {
      res.status(200).json({
        message: "Proyectos recuperados exitosamente!",
        proyectos: proyectosInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Proyectos!",
        error: error.message
      });
    });
};

exports.ObtenerProyectosId = (req, res) => {
  let proyectosId = req.params.idProyecto;
  Proyectos.findByPk(proyectosId)
    .then(proyectos => {
      if (proyectos) {
        res.status(200).json({
          message: `Proyecto obtenido con id = ${proyectosId}`,
          proyectos: proyectos
        });
      } else {
        res.status(404).json({
          message: `No se encontró el Proyecto con id = ${proyectosId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el Proyecto",
        error: error.message
      });
    });
};

exports.ActualizarProyectos = async (req, res) => {
  try {
    let proyectosId = req.params.idProyecto; 
    let proyectos = await Proyectos.findByPk(proyectosId);

    if (!proyectos) {
      res.status(404).json({
        message: `No fue posible actualizar el proyecto con id = ${proyectosId}`,
        proyectos: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        usuarioId: req.body.usuarioId,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fechaRegistro: req.body.fechaRegistro,
      };
      let result = await Proyectos.update(updatedObject, { returning: true, where: { id: proyectosId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el Proyecto con id = " + req.params.idProyecto,
          error: "Can NOT Updated"
        });
      }
      res.status(200).json({
        message: `Proyecto actualizado con éxito, id = ${proyectosId}`,
        proyectos: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el Proyecto con id = " + req.params.idProyecto,
      error: error.message
    });
  }
};

exports.EliminarProyectos = async (req, res) => {
  try {
    let proyectosId = req.params.idProyecto;
    let proyectos = await Proyectos.findByPk(proyectosId);

    if (!proyectos) {
      res.status(404).json({
        message: `No existe el proyectos con id = ${proyectoId}`,
        error: "404"
      });
    } else {
      await proyectos.destroy();
      res.status(200).json({
        message: `proyectos eliminado con éxito, id = ${proyectoId}`,
        proyectos: proyectos
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el proyectos con id = " + req.params.idProyecto,
      error: error.message
    });
  }
};