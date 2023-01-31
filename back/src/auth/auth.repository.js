class AuthRepository {
    constructor({ User }){
        this.User = User;
    }

    async getSignIn({userId, userPw}){
        try{
            const user = await this.User.findOne({
                raw : true,
                attributes : ["userId", "userPw"],
                where : {
                    userId, userPw
                }
            })
            return user;
        }catch(e){
            throw new Error(e)
        }
    }
}

module.exports = AuthRepository;