const compression = require('compression');
const express = require('express');
const fileManagerMiddleware = require('@opuscapita/filemanager-server').middleware;
const logger = require('@opuscapita/filemanager-server').logger;
const env = require('./resources/env.json')


const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3020';
const baseUrl = process.env.BASE_URL || '';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(`${baseUrl}/:context`, (req, res) => {
    const {context} = req.params;

    let p, rn;
    if (context !== undefined) {
        p = `${env.fileRoot}/${context}`
        rn = context
    } else {
        p = env.fileRoot
        rn = "."
    }

    const fmm = fileManagerMiddleware({fsRoot: p, rootName: rn})

    return fmm(req, res);
});


app.listen(port, host, function (err) {
    if (err) logger.error(err);

    logger.info(`Server listening at http://${host}:${port}`);
});

process.on('exit', function () {
    logger.warn('Server has been stopped');
});

