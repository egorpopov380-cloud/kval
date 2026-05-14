const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const requestRouter = require('./routes/request');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(authRouter);
app.use(requestRouter);

app.listen(port, () => console.log('Server is running on port ' + port));