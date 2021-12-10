const Contacts = require("../models/contactModel")
const catchAsync = require("../utilies/catchAsync")

exports.newContact = catchAsync(async (req, res, next) => {
    const contact = await Contacts.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Contact created sucessfully'
    })
})