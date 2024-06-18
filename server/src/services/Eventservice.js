const { ValidationErrorItemType } = require('sequelize');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const { Event } = require('../models');
const bcrypt = require('bcrypt');
const JWT_SECRET = "event"
const Joi = require("joi")

const createEventSchema = Joi.object({
    eventname: Joi.string().required(),
    startTime: Joi.required(),
    endTime: Joi.required(),
    venue: Joi.string().required(),
    capacity: Joi.number().required(),
    price: Joi.string().required(),
    repeatEvent: Joi.string().required()
})


const createEvent = async(data)=>{
    try{
        const {error,value} = createEventSchema.validate(data)
        if (error) {
            throw new Error(error.details[0].message);
          }
        const event = await Event.create(value);
        return event;
    }
    catch(error){
        throw new Error(error.message);
    }
}

const getEvent = async()=>{
    try{
        const events = await Event.findAll();
        return events;
    }
    catch(error){
        throw new Error(error.message);
    }
}

const getEventById = async(id)=>{
    try{
        const event = await Event.findByPk(id);

   if (!event) {
            throw new Error('Event not found');
        }
        return event;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateEvent = async (id, data) => {
    try {
  
      const event = await Event.findByPk(id);
      if (!event) {
        throw new Error('Event not found');
      }
        await event.update(data);
      return event;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteEvent = async (id) => {
    try {
        const event = await Event.findByPk(id);
        if (!event) {
            throw new Error('Event not found');
        }
        await event.destroy();
        console.log("event deleted")
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports={
    createEvent,getEvent,getEventById,updateEvent,deleteEvent
}





