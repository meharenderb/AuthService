const { UserService } = require('../services/index');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
        console.log("req.body ", req.body);
        
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            status: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        console.error("Something went wrong on controller layer");
    }
}

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const token = await userService.signIn(email, password);
        console.log("token ", token);
        
        return res.status(200).json({
            status: true,
            message: 'User logged in successfully!',
            data: {accessToken: token}
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: 'Something went wrong!',
            data: {},
            err: error 
        });
    }
}

module.exports = {
    createUser,
    signIn
}