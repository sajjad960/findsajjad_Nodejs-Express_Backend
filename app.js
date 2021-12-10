const express = require('express');
const app = express();

const contactRouter = require('./routes/contactRouter');
const AppError = require('./utilies/AppError');
const globalAppError = require('./controllers/errorController')

app.use(express.json());

app.use((req, res, next) => {
    console.log('hello from middleware');
    next()
})


// Routes
app.use("/api/v1/contact", contactRouter)

// handle any routes hit error
app.all("*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
})

// handling global error
app.use(globalAppError)


module.exports = app;