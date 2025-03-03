const { User } = require('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data); 
            return user;
        } catch (error) {
            console.error("Something went wrong on repository layer");
            throw error;
        }
    }

    async getUserByEmail(email){
        try {
            const user = await User.findOne({where: { email: email }});             
            return user;
        } catch (error) {
            console.error("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;