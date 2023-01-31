const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({origin : true, credentials : true}));
app.use(express.json());
app.use((error, req,res,next) => {
    res.status(500).send(error.message)
});

module.exports = app;