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

module.exports = {
    createUser
}