const db = require('../Config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
  let libro = {};

  try {
    libro.titulo = req.body.titulo;
    libro.autor = req.body.autor;
    libro.isbn = req.body.isbn;
    libro.editorial = req.body.editorial;
    libro.anioPublicacion = req.body.anioPublicacion;
    libro.categoria = req.body.categoria;
    libro.cantidadDisponible = req.body.cantidadDisponible;
    libro.ubicacion = req.body.ubicacion;

    Libro.create(libro).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.id}`,
        libro: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
}
};

exports.retrieveAllLibro = (req, res) => {
Libro.findAll()
  .then(libroInfo => {
    res.status(200).json({
      message: "Libros recuperados exitosamente!",
      libros: libroInfo
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener libros!",
      error: error.message
    });
  });
};

exports.getLibroById = (req, res) => {
let libroId = req.params.id;
Libro.findByPk(libroId)
.then(libro => {
    if (libro) {
      res.status(200).json({
        message: `Libro obtenido con id = ${libroId}`,
        libro: libro
      });
    } else {
      res.status(404).json({
        message: `No se encontró el libro con id = ${libroId}`
      });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: "No fue posible obtener el libro",
      error: error.message
    });
  });
};

exports.updateById = async (req, res) => {
try {
  let libroId = req.params.id;
  let libro = await Libro.findByPk(libroId);
  if (!libro) {
    res.status(404).json({
      message: `No fue posible actualizar el libro con id = ${libroId}`,
      libro: "",
      error: "404"
    });
  } else {
    let updatedObject = {
      titulo: req.body.titulo,
      autor: req.body.autor,
      isbn: req.body.isbn,
      editorial: req.body.editorial,
      anioPublicacion: req.body.anioPublicacion,
      categoria: req.body.categoria,
      cantidadDisponible: req.body.cantidadDisponible,
      ubicacion: req.body.ubicacion
    };
    let result = await Libro.update(updatedObject, { returning: true, where: { idLibro: libroId } });

    if (!result) {
      res.status(500).json({
        message: "Error -> No fue posible actualizar el libro con id = " + req.params.id,
        error: "Can NOT Updated"
      });
    }

    res.status(200).json({
      message: `Libro actualizado con éxito, id = ${libroId}`,
      libro: updatedObject
    });
  }
} catch (error) {
  res.status(500).json({
    message: "Error -> No se puede actualizar el libro con id = " + req.params.id,
    error: error.message
  });
}
};

exports.deleteById = async (req, res) => {
try {
  let libroId = req.params.id;
  let libro = await Libro.findByPk(libroId);

  if (!libro) {
    res.status(404).json({
      message: `No existe el libro con id = ${libroId}`,
      error: "404"
    });
} else {
    await libro.destroy();
    res.status(200).json({
      message: `Libro eliminado con éxito, id = ${libroId}`,
      libro: libro
    });
  }
} catch (error) {
  res.status(500).json({
    message: "Error -> No se puede eliminar el libro con id = " + req.params.id,
    error: error.message
  });
}
};