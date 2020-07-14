const compression = require('compression');
const express = require('express');
const fileManagerMiddleware = require('@opuscapita/filemanager-server').middleware;
const cors = require('cors');
const env = require('./resources/env.json')


const app = express();
app.use(cors());

const port = process.env.PORT || '3020';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());


app.use(`/bank/:context`, (req, res) => {
    const {context} = req.params;
    const fmm = fileManagerMiddleware({
        fsRoot: `${env.fileRoot}/${env.bankDir}/${context}`, rootName: context
    });
    return fmm(req, res);
});


app.listen(port, () => console.log(`App listening on port ${port}`));
