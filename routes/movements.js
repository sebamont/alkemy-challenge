const express = require('express');
const router = express.Router();
const {getMovements, addMovement, deleteMovement, editMovement} = require('../controllers/movements')


router.route('/')
    .get(getMovements)
    .post(addMovement);

router.route('/:id')
    .delete(deleteMovement)
    .patch(editMovement);

module.exports = router;