const db = require('../Config/db.config.js');
const Autor = db.Autor;

exports.create = (req, res) => {
  let autor = {};

  try {
    autor.nombre = req.body.nombre;
    autor.apellido = req.body.apellido;
    autor.nacionalidad = req.body.nacionalidad;
    autor.fechaNacimiento = req.body.fechaNacimiento;

    Autor.create(autor).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.id}`,
        autor: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
}
};

exports.retrieveAllAutor = (req, res) => {
Autor.findAll()
  .then(autorInfo => {
    res.status(200).json({
      message: "Autores recuperados exitosamente!",
      autores: autorInfo
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener autores!",
      error: error.message
    });
  });
};

exports.getAutorById = (req, res) => {
let autorId = req.params.id;
Autor.findByPk(autorId)
.then(autor => {
    if (autor) {
      res.status(200).json({
        message: `Autor obtenido con id = ${autorId}`,
        autor: autor
      });
    } else {
      res.status(404).json({
        message: `No se encontró el autor con id = ${autorId}`
      });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "No fue posible obtener el autor",
      error: error.message
    });
  });
};

exports.updateById = async (req, res) => {
try {
  let autorId = req.params.id;
  let autor = await Autor.findByPk(autorId);
  if (!autor) {
    res.status(404).json({
      message: `No fue posible actualizar el autor con id = ${autorId}`,
      autor: "",
      error: "404"
    });
  } else {
    let updatedObject = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nacionalidad: req.body.nacionalidad,
      fechaNacimiento: req.body.fechaNacimiento,
    };
    let result = await Autor.update(updatedObject, { returning: true, where: { idAutor: autorId } });

    if (!result) {
      res.status(500).json({
        message: "Error -> No fue posible actualizar el autor con id = " + req.params.id,
        error: "Can NOT Updated"
      });
    }

    res.status(200).json({
      message: `Autor actualizado con éxito, id = ${autorId}`,
      autor: updatedObject
    });
  }
} catch (error) {
  res.status(500).json({
    message: "Error -> No se puede actualizar el autor con id = " + req.params.id,
    error: error.message
  });
}
};

exports.deleteById = async (req, res) => {
try {
  let autorId = req.params.id;
  let autor = await Autor.findByPk(autorId);

  if (!autor) {
    res.status(404).json({
      message: `No existe el autor con id = ${autorId}`,
      error: "404"
    });
} else {
    await autor.destroy();
    res.status(200).json({
      message: `Autor eliminado con éxito, id = ${autorId}`,
      autor: autor
    });
  }
} catch (error) {
  res.status(500).json({
    message: "Error -> No se puede eliminar el autor con id = " + req.params.id,
    error: error.message
  });
}
};