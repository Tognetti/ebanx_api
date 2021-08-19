const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body.type);
    console.log(req.body.destination);
    console.log(req.body.amount);

    res.status(200).json({
        message: 'Event response',
    });
});

module.exports = router;