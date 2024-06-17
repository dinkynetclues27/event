const express = require("express");
const eventRoutes = express.Router();
const eventController = require('../controllers/Eventcontroller');



eventRoutes.post('/',eventController.createEventController);
eventRoutes.get('/',eventController.getEventController);
eventRoutes.get("/:id",eventController.getEventByIdController);
eventRoutes.patch("/:id",eventController.updateEventController);
eventRoutes.delete("/:id",eventController.deleteEventController);

module.exports = eventRoutes; 
