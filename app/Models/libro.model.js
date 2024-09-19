module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define("libro", {
      
      idLibro: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
      },
      autor: {
        type: Sequelize.STRING,
      },
      isbn: {
        type: Sequelize.STRING,
      },
      editorial: {
        type: Sequelize.STRING,
      },
      anioPublicacion: {
        type: Sequelize.DATE,
      },
      categoria: {
        type: Sequelize.STRING,
      },
      cantidadDisponible: {
        type: Sequelize.INTEGER,
      },
      ubicacion: {
        type: Sequelize.STRING,
      }
    });
    return Libro;
  };