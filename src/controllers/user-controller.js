const { UserService } = require('../services/index');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
        console.log("req.body ", req.body);
        
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        console.error("Something went wrong on controller layer");
        return res.status(400).json({
            success: false,
            message: error.message,
            data: {},
            err: error 
        });
    }
}

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const token = await userService.signIn(email, password);
        console.log("token ", token);
        
        return res.status(200).json({
            success: true,
            message: 'User logged in successfully!',
            data: {accessToken: token}
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong!',
            data: {},
            err: error 
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const {id} = req.body;
        const response = await userService.isAdmin(id);
        
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched whether user is admin or not',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong!',
            data: {},
            err: error 
        });
    }
}

module.exports = {
    createUser,
    signIn,
    isAdmin
}