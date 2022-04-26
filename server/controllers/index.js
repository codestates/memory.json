const express = require('express');
const router = express.Router();

const users = require('./users');
const places = require('./places');
const histories = require('./histories');
const favorites = require('./favorites');
const comments = require('./comments')

router.use('/users',users);
router.use('/places',places);
router.use('/histories',histories);
router.use('/favorites',favorites);
router.use('/comments',comments);

module.exports = router;