const db = require('../Config/db.config.js');
const Usuario = db.Usuario;

exports.CrearUsuario = (req, res) => {
  let usuario = {};

  try {
    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;
    usuario.email = req.body.email;
    usuario.telefono = req.body.telefono;
    usuario.direccion = req.body.direccion;
    usuario.fechaRegistro = req.body.fechaRegistro;
    usuario.estado = req.body.estado;

    Usuario.create(usuario).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idUsuario}`,
        usuario: result,
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
  Usuario.findAll()
    .then(usuarioInfo => {
      res.status(200).json({
        message: "Usuarios recuperados exitosamente!",
        usuario: usuarioInfo
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
  Empleado.findByPk(usuarioId)
    .then(usuario => {
      if (usuario) {
        res.status(200).json({
          message: `Usuario obtenido con id = ${usuarioId}`,
          usuario: usuario
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
    let usuario = await usuario.findByPk(usuarioId);

    if (!usuario) {
      res.status(404).json({
        message: `No fue posible actualizar el usuario con id = ${usuarioId}`,
        usuario: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        fechaRegistro: req.body.fechaRegistro,
        estado: req.body.estado,
      };
      let result = await Usuario.update(updatedObject, { returning: true, where: { id: usuarioId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el Empleado con id = " + req.params.idUsuario,
          error: "Can NOT Updated"
        });
      }
      res.status(200).json({
        message: `Empleado actualizado con éxito, id = ${usuarioId}`,
        usuario: updatedObject
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
    let usuario = await usuario.findByPk(usuarioId);

    if (!usuario) {
      res.status(404).json({
        message: `No existe el usuario con id = ${usuarioId}`,
        error: "404"
      });
    } else {
      await usuario.destroy();
      res.status(200).json({
        message: `usuario eliminado con éxito, id = ${usuarioId}`,
        usuario: usuario
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el usuario con id = " + req.params.idusuario,
      error: error.message
    });
  }
};