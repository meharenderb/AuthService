const { User, Role } = require('../models/index');

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
            
            if(!user){
                throw { error: `User not exists with this ${email}` }
            }
            return user;
        } catch (error) {
            console.error("Something went wrong on repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findOne({where: { id: userId }});    

            if(!user){
                throw { error: `User does not exists` }
            }         
            const adminRole = await Role.findOne({where: { name: 'ADMIN' }});   
            
            if(!adminRole){
                throw { error: `Roles data does not exists` }
            }

            return user.hasRole(adminRole);
        } catch (error) {
            console.error("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;