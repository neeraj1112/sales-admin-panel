const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('../config/database');
const { Wholesaler, Retailer, Stock } = require('../models');

const insertData = async () => {
  try {
    // Wholesalers
    await Wholesaler.bulkCreate([
      { name: 'Wholesaler 1', mobile_number: '9876543210' },
      { name: 'Wholesaler 2', mobile_number: '8765432109' },
      { name: 'Wholesaler 3', mobile_number: '7654321098' },
      { name: 'Wholesaler 4', mobile_number: '6543210987' },
      { name: 'Wholesaler 5', mobile_number: '5432109876' },
      { name: 'Wholesaler 6', mobile_number: '4321098765' }
    ]);

    // Retailers
    await Retailer.bulkCreate([
      { name: 'Retailer A', mobile_number: '1234567890' },
      { name: 'Retailer B', mobile_number: '2345678901' },
      { name: 'Retailer C', mobile_number: '3456789012' },
      { name: 'Retailer D', mobile_number: '4567890123' },
      { name: 'Retailer E', mobile_number: '5678901234' },
      { name: 'Retailer F', mobile_number: '6789012345' }
    ]);

    // Stock Data
    await Stock.bulkCreate([
      { retailer_id: 1, wholesaler_id: 1, stock_amount: 1200, date: '2021-01-15' },
      { retailer_id: 2, wholesaler_id: 1, stock_amount: 2200, date: '2021-02-10' },
      { retailer_id: 1, wholesaler_id: 2, stock_amount: 1500, date: '2021-03-05' },
      { retailer_id: 3, wholesaler_id: 4, stock_amount: 3000, date: '2021-04-15' },
      { retailer_id: 4, wholesaler_id: 4, stock_amount: 2000, date: '2021-05-10' },
      { retailer_id: 5, wholesaler_id: 6, stock_amount: 5500, date: '2021-06-05' }
    ]);

    // 🌟 Inserting Data into WholesalerRetailer Table
    await sequelize.query(`
      INSERT INTO "WholesalerRetailer" ("WholesalerId", "RetailerId", "createdAt", "updatedAt") VALUES
      (1, 1, NOW(), NOW()),
      (1, 2, NOW(), NOW()),
      (2, 3, NOW(), NOW()),
      (4, 5, NOW(), NOW()),
      (6, 4, NOW(), NOW()),
      (3, 6, NOW(), NOW()),
      (4, 4, NOW(), NOW()),
      (6, 3, NOW(), NOW()),
      (3, 1, NOW(), NOW())
    `);

    console.log('Data inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  }
};

insertData();
