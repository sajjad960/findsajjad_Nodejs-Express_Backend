const AppError = require("../utilies/AppError");

const handleCastErrorDB = (err, res) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleDuplicateFieldDB = (err) => {
    const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
    console.log(value);

    const message = `Duplicate field value: ${value} Please use another`;
    return new AppError(message, 400);
}


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    // Operational trusted error send message to client
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        // send genaric message
        res.status(500).json({
            status: 'error',
            message: "Something went rong"
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        console.log(err);
        sendErrorDev(err, res)
    }

    if(process.env.NODE_ENV === 'production'){
        let error = Object.assign(err);
        // console.log(error);

        if(error.name === 'CastError'){
            error = handleCastErrorDB(error);
        }
    

        if(error.code === 11000) {
          error = handleDuplicateFieldDB(error)
        }

        sendErrorProd(error, res);
    }
}