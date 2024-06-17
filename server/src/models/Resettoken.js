const { Model } = require("sequelize");
module.exports = (sequelize,DataTypes)=>{
    class Reset extends Model {

    }
    Reset.init(
        {
            user_id:{
                type: DataTypes.INTEGER,
                autoIncrement : true,
                primaryKey: true
            },
            token:{
                type: DataTypes.STRING
            },
            expires_at : {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: "Reset"
        }
    )
    // Reset.sync({force:true})
    // Event.sync({alter:true})
    return Reset;
}