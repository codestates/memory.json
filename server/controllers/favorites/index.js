const express = require('express');
const router = express.Router();

const getFavorite = require('./getFavorite');
const setFavorite = require('./setFavorite');

router.get('/:historyId', getFavorite)
router.post('/:historyId', setFavorite)

module.exports = router;