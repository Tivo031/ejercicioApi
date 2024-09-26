module.exports = (sequelize, Sequelize) => {
    const Proyectos = sequelize.define("proyectos", {
      
      idProyecto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      fechaRegistro: {
        type: Sequelize.DATE,
      }
    });
    return Proyectos;
  };
  