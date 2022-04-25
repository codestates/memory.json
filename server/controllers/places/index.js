const express = require('express');
const router = express.Router();

const place = require('./place');

router.get('/', place);

module.exports = router;