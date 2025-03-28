const { Wholesaler, Retailer, Stock } = require('../models');
const { Sequelize } = require('sequelize');

// API 1: Wholesaler with retailers

exports.getWholesalerWithRetailers = async (req, res) => {
  const { id } = req.params;

  try {
    const wholesaler = await Wholesaler.findByPk(id, {
      include: Retailer,
    });

    if (!wholesaler) {
      return res.status(404).json({ message: 'Wholesaler not found' });
    }

    res.json(wholesaler);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API 2: Single Wholesaler Retailer
exports.getSingleWholesalerRetailer = async (req, res) => {
  try {
    const retailer = await Retailer.findAll({
      include: [
        {
          model: Wholesaler,
          through: { attributes: [] }
        }
      ],
      group: ['Retailer.id', 'Wholesalers.id'],
      having: Sequelize.literal('COUNT("Wholesalers"."id") = 1') 
    });
    const filteredData = retailer.filter(item => item.Wholesalers.length === 1);
    
    res.json(filteredData || { message: "No single-wholesaler retailer found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API 3: Monthly Turnover
exports.getMonthlyTurnover = async (req, res) => {
  try {
    const turnover = await Stock.findAll({
      attributes: [
        'wholesaler_id',
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('stock_amount')), 'total_turnover']
      ],
      group: ['wholesaler_id', 'month']
    });

    res.json(turnover);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API 4: Max Turnover from Single Retailer
exports.getMaxTurnover = async (req, res) => {
  try {
    const maxTurnover = await Stock.findAll({
      attributes: [
        'wholesaler_id',
        'retailer_id',
        [Sequelize.fn('MAX', Sequelize.col('stock_amount')), 'max_turnover']
      ],
      group: ['wholesaler_id', 'retailer_id']
    });

    res.json(maxTurnover);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
