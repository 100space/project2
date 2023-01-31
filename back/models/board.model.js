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
                      type: Sequelize.STRING(255),
                      allowNull: false,
                    },
                    contentImg: {
                      type: Sequelize.STRING(255),
                      allowNull: false,
                    },
                    comment: {
                      type: Sequelize.STRING(64),
                      allowNull: false,
                    },
              },
              {
                  sequelize,
              }
          )
      }
      static associate(models){
        this.belongsTo(models.User, {
          foreignKey:"userId",
        })
        this.belongsTo(models.User, {
          foreignKey:"userPic"
        })
      }
  }
  Board.initialize();
};
