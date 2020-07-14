const compression = require('compression');
const express = require('express');
const fileManagerMiddleware = require('@opuscapita/filemanager-server').middleware;
const cors = require('cors');
const env = require('./resources/env.json')


const app = express();
app.use(cors());

const port = process.env.PORT || '3020';
const baseUrl = process.env.BASE_URL || '';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());

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


app.listen(port, () => console.log(`App listening on port ${port}`));
