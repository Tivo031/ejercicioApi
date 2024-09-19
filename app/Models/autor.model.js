module.exports = (sequelize, Sequelize) => {
    const Autor = sequelize.define("autor", {
      
      idAutor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      apellido: {
        type: Sequelize.STRING,
      },
      nacionalidad: {
        type: Sequelize.STRING,
      },
      fechaNacimiento: {
        type: Sequelize.DATE,
      }
    });
    return Autor;
  };