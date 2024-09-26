const env = require("./env.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Departamento = require('../Models/departamento.model.js')(sequelize, Sequelize);
db.Empleado = require('../Models/empleado.model.js')(sequelize, Sequelize);
db.Cliente = require('../Models/cliente.model.js')(sequelize, Sequelize);
db.Producto = require('../Models/producto.model.js')(sequelize, Sequelize);
db.Proveedor = require('../Models/proveedor.model.js')(sequelize, Sequelize);
db.Factura = require('../Models/factura.model.js')(sequelize, Sequelize);
db.FacturaDetalle = require('../Models/factura_detalle.model.js')(sequelize, Sequelize);
db.Usuario = require('../Models/usuario.model.js')(sequelize, Sequelize);
db.Libro = require('../Models/libro.model.js')(sequelize,Sequelize);
db.Autor = require('../Models/autor.model.js')(sequelize,Sequelize);

db.Usuarios = require('../Models/usuarios.model.js')(sequelize, Sequelize);
db.Proyectos = require('../Models/proyectos.model.js')(sequelize, Sequelize);
db.Tareas = require('../Models/tareas.model.js')(sequelize, Sequelize);

module.exports = db;
