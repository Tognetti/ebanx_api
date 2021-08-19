const express = require('express');
const eventRoute = require('./routes/event');
const balanceRoute = require('./routes/balance');

const port = 3003;
const app = express();
app.use(express.json());

global.accounts = [];

app.use('/balance', balanceRoute);
app.use('/event', eventRoute);

app.listen(port);