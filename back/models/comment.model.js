module.exports = (sequelize, Sequelize) => {
    class comment extends Sequelize.Model{
        static initialize () {
            return this.init ({
                CmdContent : {
                    type : Sequelize.STRING(255)
                }
            },
            {
                sequelize,
            })
        }
    }
    comment.initialize();
};

