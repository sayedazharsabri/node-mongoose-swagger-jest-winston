const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { getRecords } = require('../controllers/record');

router.post("/fetch",
    body('startDate')
        .custom((date) => {
            if (!!date && date.length != 10) {
                return false;
            }
            return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date))
        }),
    body('endDate')
        .custom((date) => {
            if (!!date && date.length != 10) {
                return false;
            }
            return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date))
        }),
    body('minCount').isNumeric(),
    body('maxCount').isNumeric(),
    getRecords);

module.exports = router;