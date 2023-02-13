class UserRepository {
    constructor({ User, sequelize, Sequelize }) {
        this.User = User
        this.Board = sequelize.models.Board
        this.sequelize = sequelize
        this.Sequelize = Sequelize
    }

    async hotValue() {
        try {
            const userHot = await this.User.findAll({ order: this.sequelize.literal('userPoint DESC'), limit: 3, raw: true })
            return userHot
        } catch (e) {
            throw new Error(e)
        }
    }

    async addUser(payload) {
        try {
            const user = await this.User.create(payload, { raw: true })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }
    // async kakaoUser(payload) {
    //     try {
    //         const user = await this.User.fineO
    //     } catch (error) {

    //     }
    // }

    async checkId({ userId }) {
        try {
            const user = await this.User.findOne({
                raw: true,
                where: {
                    userId,
                },
            })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }
    async checkNick({ nickName }) {
        try {
            const user = await this.User.findOne({
                raw: true,
                where: {
                    nickName,
                },
            })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async getInfo(userId) {
        try {
            const user = await this.User.findOne({
                raw: true,
                where: {
                    userId,
                },
            })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async updateInfo(payload) {
        try {
            const [count, affecteRows] = await this.User.update(payload, {
                where: { userId: payload.userId },
                returning: true,
            })
            if (affecteRows) {
                const response = await this.User.findOne({
                    raw: true,
                    where: {
                        userId: payload.userId,
                    },
                })
                return response
            }
            if (affecteRows === 0) throw new Error("User not found, Please redirect your webpage")
        } catch (e) {
            throw new Error(e)
        }
    }

    async findSearch({ search }) {
        try {
            const Op = this.Sequelize.Op
            const response = await this.User.findAll({
                where: {
                    userId: { [Op.like]: `%${search}%` }
                }, raw: true
            })
            const userCount = await this.User.count({
                where: {
                    userId: { [Op.like]: `%${search}%` }
                }, raw: true
            })
            return { response, userCount }
        } catch (e) {
            throw new Error(`Error while find search Value: ${e.message}`)
        }
    }

    async findWriting({ userId }) {
        const Op = this.Sequelize.Op
        try {
            const indexValue = pageNumber * 5 - 4 === 1 ? 0 : pageNumber * 5 - 4
            const response = await this.Board.findAll({
                where: {
                    userId
                }, raw: true, order: [
                    ['boardIdx', 'DESC']
                ]
            })
            return response
        } catch (e) {
            throw new Error(`Error while find writing Value: ${e.message}`)
        }
    }
}

module.exports = UserRepository
