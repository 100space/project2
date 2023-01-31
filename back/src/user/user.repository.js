class UserRepository {
    constructor({ User }) {
        this.User = User;
    }
    async addUser(payload) {
        try {
            const user = await this.User.create(payload, { raw: true });
            console.log(user, `repository`)
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }
    async getInfo(userId) {
        try {
            const user = await this.User.findOne({
                raw: true, where: {
                    userId
                }
            })
            return user
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateInfo(userId, payload) {
        try {
            const [updateCount, updateRows] = await this.User.update(payload, {
                where: { userId },
                returning: true,
            });
            if (updateCount === 0) throw new Error('User not found, Please redirect your webpage');
            return updateRow[0];
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = UserRepository;