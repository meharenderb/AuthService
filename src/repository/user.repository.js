const { User } = require('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data); 
            return user;
        } catch (error) {
            console.error("Something went wrong on repository layer");
        }
    }
}

module.exports = UserRepository;