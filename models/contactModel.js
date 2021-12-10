const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        lowercase: true,
        unique: true,
    },
    message: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

})

const Contacts = mongoose.model('Contacts', contactSchema);

module.exports = Contacts;