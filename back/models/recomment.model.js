module.exports = (sequelize, Sequelize) => {
    class Recomment extends Sequelize.Model {
        static initialize() {
            return this.init({
                cmdIdx:{
                    type: Sequelize.INTEGER,
                    allowNull:false
                },
                reCmdIdx: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                cmdContent: {
                    type: Sequelize.TEXT,
                    allowNull: false
                }
            },
                {
                    sequelize,
                })

        }
        static associate(models) {
            this.belongsTo(models.Comment, {
                foreignKey: "cmdIdx"
            })
            
        }
    }
    Recomment.initialize()
}
