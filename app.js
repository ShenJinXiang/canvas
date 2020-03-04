const path = require('path');
const express = require('express');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(4001, function() {
    console.log('Server running at 4001!');
    console.log('http://localhost:4001');
});
