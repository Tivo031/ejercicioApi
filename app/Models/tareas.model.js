module.exports = (sequelize, Sequelize) => {
    const Tareas = sequelize.define("tareas", {
      
      idTarea: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      proyectoId: {
        type: Sequelize.STRING,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
      },
      fechaCreacion: {
        type: Sequelize.DATE,
      },
      fechaVencimiento: {
        type: Sequelize.DATE,
      }
    });
    return Tareas;
  };
  