module.exports = (sequelize, Sequelize) =>{
    class Hashtag extends Sequelize.Model{
        static initialize() {
            return this.init({
                tag : {
                    type : Sequelize.STRING(30),
                    primaryKey : true,
                    allowNull : true,
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
        }
    }
    Hashtag.initialize();
};