const Contacts = require("../models/contactModel");
const APIFeatures = require("../utilies/APIFeatures");
const AppError = require("../utilies/AppError");
const catchAsync = require("../utilies/catchAsync")
const testData = require("../data/testData.json")

// Create
exports.newContact = catchAsync(async (req, res, next) => {
    const contact = await Contacts.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Contact created sucessfully'
    })
})

// Read
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

// Update
exports.updateContact = catchAsync(async (req, res, next) => {
    const contact = await Contacts.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!contact) {
        return next(new AppError("No document found with that ID", 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            contact
        }
    })
})

// Delete

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contacts.findByIdAndDelete(req.params.id);
  
  res.send("Document successfully deleted!")
})

// Testing for blocking code
exports.testingBlocking = catchAsync(async(req, res, next) => {

    // Creating data with forEach 💥
    testData.forEach(async function(data, i) {
    const contact = await Contacts.create(data);

    if(i === testData.length - 1) {
        res.send('data created')
    }
    })

    // Creating data with Promise.all 💥
    Promise.all(testData.map(function(data){
        return Contacts.create(data)
    })).then(res.send('All document created'))
})