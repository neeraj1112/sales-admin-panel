const Wholesaler = require('./wholesaler');
const Retailer = require('./retailer');
const Stock = require('./stock');

// Many-to-Many Association
Wholesaler.belongsToMany(Retailer, { through: 'WholesalerRetailer' });
Retailer.belongsToMany(Wholesaler, { through: 'WholesalerRetailer' });

Stock.belongsTo(Wholesaler, { foreignKey: 'wholesaler_id' });
Stock.belongsTo(Retailer, { foreignKey: 'retailer_id' });

module.exports = { Wholesaler, Retailer, Stock };
