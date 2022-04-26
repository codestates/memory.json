const express = require('express');
const router = express.Router();

const favorite = require('./favorite');

router.post('/', favorite)

module.exports = router;