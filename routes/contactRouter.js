const express = require('express');
const contactController = require('../controllers/contactController')


const router = express.Router();

router.route('/').post(contactController.newContact).get(contactController.getContacts)

module.exports = router;