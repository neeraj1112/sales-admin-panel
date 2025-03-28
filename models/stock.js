const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Stock = sequelize.define('Stock', {
  retailer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  wholesaler_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, { timestamps: false });

module.exports = Stock;
