const express = require('express');
const router = express.Router();

const registComment = require('./registComment');
const changeComment = require('./changeComment');
const deleteComment = require('./deleteComment');

router.post('/:historyId', registComment);
router.patch('/:commentId', changeComment);
router.delete('/:commentId', deleteComment);

module.exports = router;