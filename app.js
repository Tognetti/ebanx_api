const express = require('express');

const eventRoute = require('./routes/event');
const balanceRoute = require('./routes/balance');
const resetRoute = require('./routes/reset');

const port = 3003;

const app = express();

app.use(express.json());

app.use('/reset', resetRoute);
app.use('/balance', balanceRoute);
app.use('/event', eventRoute);

app.listen(port);