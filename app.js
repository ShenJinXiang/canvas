const path = require('path');
const express = require('express');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(6098, function() {
    console.log('Server running at 6098!');
    console.log('http://localhost:6098');
});
