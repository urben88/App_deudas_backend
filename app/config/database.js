const keys = require('./keys')
module.exports = {
    // Configuración db
      username: keys.database.user || "root",
      password: keys.database.password || null,
      database: keys.database.database || "database_development",
      host: keys.database.host || "127.0.0.1",
      dialect: "mysql",
      port:keys.database.port,
  
    //Configurar seeders
    seederStorage:"sequelize",
    seederStorageTableName: "seeds",
    seedersTimestamps: true,
  
    //Configuración de Migraciones
    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",
    migrationTimestamps: true,
  
    //Para que los modelos tengan los mismos nombre que las tablas
    freezeTableName: true
  }
