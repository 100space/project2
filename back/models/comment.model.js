module.exports = (sequelize, Sequelize) => {
    class comment extends Sequelize.Model{
        static initialize () {
            return this.init ({
                content : {
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

