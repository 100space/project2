module.exports = (sequelize, Sequelize) => {
    class category extends Sequelize.Model {
        static initialize () {
            return this.init ({
                categoryMain : {
                    type : Sequelize.STRING(64)
                },
                categorySub : {
                    type : Sequelize.STRING(64),
                },
            },
            {
                sequelize,
            })
        }
    }
    category.initialize();
};
