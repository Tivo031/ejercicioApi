const env = {
  database: "umg_antigua_examen",
  username: "umg_antigua_examen_user",
  password: "oxbQJOhadRo7CXlip95auzqHsfqWMVoE",
  host: "dpg-crvenou8ii6s73e7gmi0-a.oregon-postgres.render.com",
  dialect: "postgres",
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
};

module.exports = env;

