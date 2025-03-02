const express = require('express');
const {PORT} = require('./config/serverConfig');
const ApiRouting = require('./routes/index');
const bodyParser = require('body-parser');

async function startServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRouting);

    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    })
}

startServer();