const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('./common/middlewares/rate-limit.middleware');
const errorMiddleware = require('./common/middlewares/error.middleware');
const { swaggerUi, swaggerDocument } = require('./config/swagger.config');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);

app.use(errorMiddleware);

module.exports = app;