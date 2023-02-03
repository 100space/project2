module.exports = (sequelize, Sequelize) =>{
    class Hashtag extends Sequelize.Model{
        static initialize() {
            return this.init({
                tag : {
                    type : Sequelize.STRING(30),
                    // primaryKey : true,
                    allowNull : true,
                },
                hashTagIdx : {
                    type : Sequelize.INTEGER,
                    primaryKey : true,
                    autoIncrement : true,
                }
            },
            {
                sequelize,
            })
        }
        static associate(models){
            this.belongsToMany(models.Board, {
                through :"Hash",
                foreignKey : "tag",
            })
            this.belongsToMany(models.Board, {
                through : "Hash",
                foreignKey : "hashTagIdx"
            })
        }
    }
    Hashtag.initialize();
};