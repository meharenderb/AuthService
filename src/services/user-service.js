const { UserRepository } = require('../repository/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');

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
            throw error;
        }
    }

    async createToken(user){
        try {            
            const token = await jwt.sign({
                data: user, 
                iat: Math.floor(Date.now() / 1000) - 30,
                exp: Math.floor(Date.now() / 1000) + (60)
            }, JWT_KEY, { algorithm: 'HS256' });            
            return token;
        } catch (error) {
            console.error("Something went wrong on service layer", error);
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try {
            const user = await this.userRepo.getUserByEmail(email);
            
            if(!user){
                throw {error: 'User not found with this email.'}
            }

            const passwordMatch = await this.comparePassword(plainPassword, user.password);
            
            if(!passwordMatch){
                throw { error: 'Inorrect password!' }
            }

            const accessToken = await this.createToken({ id: user.id, email: user.email });
            console.log("accessToken ", accessToken);
            
            return accessToken;
        } catch (error) {
            console.error("Something went wrong on service layer");
            throw error;
        }
    }

    async comparePassword(plainPassword, dbPassword){
        try {
            const isVerified = bcrypt.compareSync(plainPassword, dbPassword);
            return isVerified;
        } catch (error) {
            console.error("Something went wrong on service layer");
            throw error;
        }
    }
}

module.exports = UserService;