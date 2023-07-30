'use strict';

module.exports = (sequelize, DataTypes) => {

  const Usuario = sequelize.define('Usuario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    activada:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece el valor predeterminado a la fecha y hora actuales
        allowNull: false,
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Establece el valor predeterminado a la fecha y hora actuales
        allowNull: false,
    }
  }, {
    tableName:"usuario",
    sequelize,
    modelName: "usuario",
  });

  Usuario.associate = function(models){

  }
  return Usuario;
};