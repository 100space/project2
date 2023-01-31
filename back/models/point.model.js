module.exports = (sequelize, Sequelize) => {
    class point extends Sequelize.Model {
        static initialize() {
            return this.init ({
                userPoint : {
                    type : Sequelize.INTEGER,
                },
            },
            {
                sequelize,
            })
        }
    }
    point.initialize();
};