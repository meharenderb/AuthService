const express = require('express');

const router = express.Router();

const UserController = require('../../controllers/user-controller');
const { validateUserRequest, authMiddleware } = require('../../middlewares/index');

router.post('/register', validateUserRequest, UserController.createUser);
router.post('/signIn', validateUserRequest, UserController.signIn);
router.post('/dummy', authMiddleware.authenticateUser, (req, res) => {
    console.log("req ", req);
    
    return res.status(200).json({msg: 'hello'});
});

router.get('/isAdmin', authMiddleware.authenticateUser, authMiddleware.validateIsAdminRequest, UserController.isAdmin);

module.exports = router;