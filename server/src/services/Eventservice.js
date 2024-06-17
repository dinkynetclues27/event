const { ValidationErrorItemType } = require('sequelize');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const { Event } = require('../models');
const bcrypt = require('bcrypt');
const JWT_SECRET = "event"


const createEvent = async(data)=>{
    try{
        const event = await Event.create(data);
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





