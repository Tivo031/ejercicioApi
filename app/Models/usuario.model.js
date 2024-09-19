module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
      
      idUsuario: {
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
      email: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
      },
      fechaRegistro: {
        type: Sequelize.DATE,
      },
      estado: {
        type: Sequelize.STRING,
      }
    });
    return Usuario;
  };
  