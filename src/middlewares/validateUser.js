async function validateUserRequest(req, res, next){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({
            success: false,
            message: 'Email & Password field is required!',
        });
    }

    next();
}


module.exports = validateUserRequest;