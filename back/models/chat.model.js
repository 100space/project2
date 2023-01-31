module.exports = (sequelize, Sequelize) => {
    class chat extends Sequelize.Model {
        static initialize() {
            return this.init({
                chatContent : {
                    type : Sequelize.STRING(255)
                }
            },
            {
                sequelize,
            })
        }
    }
    chat.initialize();
};