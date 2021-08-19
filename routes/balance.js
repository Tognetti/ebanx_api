const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const id = req.query.account_id;

    console.log(id);

    res.status(200).json({
        message: 'Balance response',
    });
});

module.exports = router;