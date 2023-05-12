const express = require('express');
const compression = require('compression');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static('public', {index: false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send('Ooops! Something went wrong.');
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});