const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

const logger = require('./logger/logger')
const recordRouter = require('./routes/record');

const app = express();
const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json());

app.use("/records", recordRouter);

app.use((error, req, res, next) => {
  //It is Express Error handling route
  logger.error(JSON.stringify(error));
  logger.error(JSON.stringify(req));
  logger.error(JSON.stringify(res));

  const responseObject = {
    "code": 2,
    "msg": "Something went wrong, Please try later",
    "records": [
    ]
  }
  res.send(responseObject);
});

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING || '',
  (err) => {
    if (err) {
      logger.error(err);
      return;
    }
    logger.info('Server connected');
    app.listen(port);
  }
);