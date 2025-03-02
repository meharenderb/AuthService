const { UserRepository } = require('../repository/index');

class UserService {
    constructor(){
        this.userRepo = new UserRepository();
    }

    async createUser(data){
        try {
            const user = await this.userRepo.create(data);
            return user;
        } catch (error) {
            console.error("Something went wrong on service layer");
        }
    }
}

module.exports = UserService;