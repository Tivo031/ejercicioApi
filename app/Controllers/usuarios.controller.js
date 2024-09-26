const db = require('../Config/db.config.js');
const Usuarios = db.Usuarios;

exports.CrearUsuario = (req, res) => {
  let usuarios = {};

  try {
    usuarios.nombre = req.body.nombre;
    usuarios.correo = req.body.correo;
    usuarios.contrasenia = req.body.contrasenia;
    usuarios.fechaCreacion = req.body.fechaCreacion;

    Usuarios.create(usuarios).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idUsuario}`,
        usuarios: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllUsuario = (req, res) => {
  Usuarios.findAll()
    .then(usuarioInfo => {
      res.status(200).json({
        message: "Usuarios recuperados exitosamente!",
        usuarios: usuarioInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Usuarios!",
        error: error.message
      });
    });
};

exports.ObtenerUsuarioId = (req, res) => {
  let usuarioId = req.params.idUsuario;
  Usuarios.findByPk(usuarioId)
    .then(usuarios => {
      if (usuarios) {
        res.status(200).json({
          message: `Usuario obtenido con id = ${usuarioId}`,
          usuarios: usuarios
        });
      } else {
        res.status(404).json({
          message: `No se encontró el usuario con id = ${usuarioId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el usuario",
        error: error.message
      });
    });
};

exports.ActualizarUsuario = async (req, res) => {
  try {
    let usuarioId = req.params.idUsuario;
    let usuarios = await usuarios.findByPk(usuarioId);

    if (!usuarios) {
      res.status(404).json({
        message: `No fue posible actualizar el usuario con id = ${usuarioId}`,
        usuarios: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
        fechaCreacion: req.body.fechaCreacion,
      };
      let result = await Usuarios.update(updatedObject, { returning: true, where: { id: usuarioId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el Empleado con id = " + req.params.idUsuario,
          error: "Can NOT Updated"
        });
      }
      res.status(200).json({
        message: `Empleado actualizado con éxito, id = ${usuarioId}`,
        usuarios: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el Empleado con id = " + req.params.idUsuario,
      error: error.message
    });
  }
};

exports.EliminarUsuario = async (req, res) => {
  try {
    let usuarioId = req.params.idUsuario;
    let usuarios = await usuarios.findByPk(usuarioId);

    if (!usuarios) {
      res.status(404).json({
        message: `No existe el usuario con id = ${usuarioId}`,
        error: "404"
      });
    } else {
      await usuario.destroy();
      res.status(200).json({
        message: `usuario eliminado con éxito, id = ${usuarioId}`,
        usuarios: usuarios
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el usuario con id = " + req.params.idusuario,
      error: error.message
    });
  }
};