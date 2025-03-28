const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wholesaler = sequelize.define('Wholesaler', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { timestamps: false });

module.exports = Wholesaler;
