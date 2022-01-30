const { validationResult } = require('express-validator');
const logger = require('../logger/logger');
const RecordModel = require('../models/record');


const getRecords = async (req, res) => {
    try {

        //Checking for errors in request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(JSON.stringify(errors.array()));
            const msg = `${errors.array()[0]['param']}: ${errors.array()[0]['msg']}`
            const response = {
                "code": 1,
                "msg": msg,
                "records": []
            };
            return res.status(422).send(response);
        }


        const startDate = new Date(req.body.startDate).toISOString();
        const endDate = new Date(req.body.endDate).toISOString();
        const minCount = req.body.minCount;
        const maxCount = req.body.maxCount;
        const data = await RecordModel.aggregate([{ $match: { $and: [{ createdAt: { $lte: new Date(endDate) } }, { createdAt: { $gte: new Date(startDate) } }] } }, { $unwind: "$counts" }, { $project: { _id: 1, counts: 1, key: 1, createdAt: 1 } }, { $group: { _id: "$_id", key: { $first: "$key" }, createdAt: { $first: "$createdAt" }, totalScore: { $sum: "$counts" } } }, { $match: { $and: [{ totalScore: { $gt: minCount } }, { totalScore: { $lt: maxCount } }] } }, { $project: { _id: 0, totalScore: 1, key: 1, createdAt: 1 } }]);
        const response = {
            "code": 0,
            "msg": "Success",
            "records": data
        }
        res.status(200).send(response);
    } catch (error) {
        // write a function to send an email to corresponding team
        logger.error(error);
        res.status(500).send({
            "code": 1,
            "msg": "Try after sometimes",
            "records": []
        })
    }
}


module.exports = { getRecords };