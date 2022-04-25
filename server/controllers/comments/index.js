const express = require('express');
const router = express.Router();

const registComment = require('./registComment');
const changeComment = require('./changeComment');
const deleteComment = require('./deleteComment');

router.post('/', registComment);
router.patch('/', changeComment);
router.delete('/', deleteComment);

module.exports = router;