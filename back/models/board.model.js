module.exports = (sequelize, Sequelize) => {
    class Board extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    boardIdx: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    subject: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    content: {
                        type: Sequelize.TEXT("long"),
                        allowNull: false,
                    },
                    viewCount: {
                        type: Sequelize.INTEGER,
                        defaultValue: 0,
                    },
                    categoryMain: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    categorySub: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    liked: {
                        type: Sequelize.INTEGER,
                        defaultValue: 0,
                    },
                },
                {
                    sequelize,
                }
            )
        }
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "userId",
            })
            // this.belongsTo(models.Comment,{
            //   foreignKey : "cmdIdx"
            // })
            this.hasMany(models.Comment, {
                foreignKey: "boardIdx",
            })
            this.hasMany(models.ContentImg, {
                foreignKey: "boardIdx",
            })
            this.belongsToMany(models.Hashtag, {
                through: "Hash",
                foreignKey: "boardIdx",
            })
            this.belongsToMany(models.User, {
                through: "Liked",
                foreignKey: "boardIdx",
            })
        }
    }
    Board.initialize()
}
