const { Model } = require("sequelize");
module.exports = (sequelize,DataTypes)=>{
    class Event extends Model {

    }
    Event.init(
        {
            eventId:{
                type: DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey: true
            },
            eventname:{
                type: DataTypes.STRING
            },
            startTime: {
                type: DataTypes.DATE
            },
            endTime: {
                type: DataTypes.DATE,
            },
            venue: {
                type: DataTypes.STRING
            
            },
            capacity: {
                type: DataTypes.INTEGER
            },
            price: {
                type: DataTypes.DECIMAL,
                values:[7,2]
            },
            repeatEvent: {
                type: DataTypes.ENUM,
                values: ['daily', 'weekly', 'monthly', 'yearly', 'none'],
                defaultValue: 'none'
            }
        },
        {
            sequelize,
            modelName: "Event"
        }
    )
    // Event.sync({force:true})
    // Event.sync({alter:true})
    return Event;
}