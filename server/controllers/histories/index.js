const express = require('express');
const router = express.Router();

const registHistory = require('./registHistory');
const searchByPlace = require('./searchByPlace');
const searchByUser = require('./searchByUser');
const searchByFavorite = require('./searchByFavorite');
const changeHistory = require('./changeHistory');

router.post('/', registHistory);
router.get('/place', searchByPlace);
router.get('/user', searchByUser);
router.get('/favorite', searchByFavorite);
router.patch('/', changeHistory);

module.exports = router;