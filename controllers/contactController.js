const Contacts = require("../models/contactModel");
const APIFeatures = require("../utilies/APIFeatures");
const catchAsync = require("../utilies/catchAsync")

exports.newContact = catchAsync(async (req, res, next) => {
    const contact = await Contacts.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Contact created sucessfully'
    })
})

exports.getContacts = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Contacts.find(), req.query).filter().paginate();

    const contacts = await features.query;

    // Send response
    res.status(200).json({
        status: 'success',
        resutls: contacts.length,
        data: {
            contacts
        }
    })
})