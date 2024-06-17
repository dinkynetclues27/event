// const {Event} = require('../models/Event');
// const JWT_SECRET = "event"
// const nodemailer = require('nodemailer');

const { createEvent , getEvent , getEventById,updateEvent,deleteEvent} = require('../services/Eventservice');

const createEventController = async (req,res) =>{
    try{
        const event = await createEvent(req.body);
        res.status(200).json(event);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const getEventController = async(req,res)=>{
    try{
        const events = await getEvent();
        res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getEventByIdController = async(req,res)=>{
    try {
        const event = await getEventById(req.params.id);
        res.status(200).json(event);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

const updateEventController = async(req,res)=>{
    try{
      const updatedEvent = await updateEvent(req.params.id, req.body)
      res.status(200).json(updatedEvent);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

const deleteEventController = async(req,res)=>{
    try {
        await deleteEvent(req.params.id);
        return res.status(200).json({ message: "deleted successfully" });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}


module.exports = { createEventController,getEventController,getEventByIdController,updateEventController,deleteEventController}


