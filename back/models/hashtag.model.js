module.exports = (sequelize, Sequelize) =>{
    class hashtag extends Sequelize.Model{
        static initialize() {
            return this.init({
                hashtagIdx : {
                    type : Sequelize.INTEGER,
                    primaryKey : true,
                    autoIncrement : true,
                },

                hashtag : {
                    type : Sequelize.STRING(20),
                    allowNull : true,
                }
            },
            {
                sequelize,
            })
        }
        static associate(models){
            this.belongsToMany(models.Board,{
                through:"hash",
                foreignKey:"hashtagIdx",
            })
        }
    }

    hashtag.initialize();
};