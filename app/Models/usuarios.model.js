module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("usuarios", {
      
      idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
      },
      contrasenia: {
        type: Sequelize.STRING,
      },
      fechaCreacion: {
        type: Sequelize.DATE,
      }
    });
    return Usuarios;
  };
  