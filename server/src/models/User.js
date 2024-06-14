const {Model} = require("sequelize");
module.exports = (sequelize,DataTypes)=>{
    const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/
        class User extends Model{
        }
        User.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    autoIncrement : true,
                    primaryKey: true
                },
                Name:{
                    type: DataTypes.STRING
                },
                Email:{
                    type : DataTypes.STRING,
                    unique: true,
                    allowNull: false
                },
                Password:{
                    type: DataTypes.STRING,
                    allowNull: false
                },
                
                Mobile_No :{
                    type: DataTypes.STRING,
                    validate: {
                        validator: function(v) {
                            return phoneValidationRegex.test(v); 
                    }
                   }
                }, 

                Gender : {
                    type: DataTypes.ENUM,
                    values : ['male','female']
                },

                Status:{
                    type: DataTypes.ENUM,
                    values: ['active','deactive']
                },
                Request :{
                    type: DataTypes.ENUM,
                    values: ['pending','approve','reject']
                },
                User_type:{
                    type: DataTypes.ENUM,
                    values:['user','admin']
                }
            
            },
            {
                sequelize,
                modelName: "User"
            }
        )
        // User.sync({ force: true });
        // User.sync({alter : true})
        return User;
}