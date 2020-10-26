const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.listen(3000, () => console.log('connection established'));

app.get('/api', (req, res) => {
    res.json({message: 'welocome to API'})
});