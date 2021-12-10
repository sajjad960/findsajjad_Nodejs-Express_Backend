const express = require('express');
const app = express();

const contactRouter = require('./routes/contactRouter')

app.use(express.json());

app.use((req, res, next) => {
    console.log('hello from middleware');
    next()
})


// Routes
app.use("/api/v1/contact", contactRouter)


module.exports = app;