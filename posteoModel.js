const { DataTypes } = require('sequelize');

const {sequelize} = require('./database.js');

const Posteo = sequelize.define('Posteo', {
    titulo: {
      type: DataTypes.STRING,
      
    },
    descripcion: {
      type: DataTypes.STRING
      
    },
    link: {
      type: DataTypes.STRING
      
    },

    fecha: {
      type: DataTypes.STRING
      
    },
    
  }, {
    timestamps : false,
    tableName :'posteos',
  });

module.exports =Posteo