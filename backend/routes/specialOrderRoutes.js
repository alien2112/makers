const express = require('express');
const router = express.Router();
const { createSpecialOrder } = require('../controllers/specialOrderController');

router.post('/', createSpecialOrder);

module.exports = router;



