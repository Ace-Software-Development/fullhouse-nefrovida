const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.json({
        status: 'Hello World'
    });
});

module.exports = router;