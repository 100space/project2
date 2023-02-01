module.exports = (sequelize, Sequelize) => {
    class Category extends Sequelize.Model {
        static initialize () {
            return this.init ({
                categoryMain : {
                    type : Sequelize.STRING(64),
                    primaryKey : true,
                },
                categorySub : {
                    type : Sequelize.STRING(64),
                    primaryKey : true,
                },
            },
            {
                sequelize,
                tableName : "Category",
                autoIncrement : false,
            })
        }
        static associate(models){
            this.hasMany(models.Board, {
                foreignKey : "categoryMain"
            })
            this.hasMany(models.Board,{
                foreignKey : "categorySub"
            })
        }
    }
    Category.initialize();
};
