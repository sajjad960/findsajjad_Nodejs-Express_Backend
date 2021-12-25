const express = require('express');
const contactController = require('../controllers/contactController')


const router = express.Router();

router.route('/').post(contactController.newContact).get(contactController.getContacts)
router.route('/:id').patch(contactController.updateContact).delete(contactController.deleteContact)
router.route('/test').get(contactController.testingBlocking)

module.exports = router;