const express = require('express');
const { getWholesalerWithRetailers, getSingleWholesalerRetailer, getMonthlyTurnover, getMaxTurnover } = require('../controllers/wholesalerController');

const router = express.Router();

router.get('/wholesaler/:id', getWholesalerWithRetailers);
router.get('/single-retailer', getSingleWholesalerRetailer);
router.get('/monthly-turnover', getMonthlyTurnover);
router.get('/max-turnover', getMaxTurnover);

module.exports = router;
