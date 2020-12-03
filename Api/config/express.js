const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');

module.exports = () =>{
    const app = express();
    const index = require('../routes/index');

    app.set('port', config.get('server.port'));

    app.use(cors());

    app.use(bodyParser.json());

    app.use('/v1/api', index);
    

    return app;
}