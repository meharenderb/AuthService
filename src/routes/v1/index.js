const express = require('express');

const router = express.Router();

const UserController = require('../../controllers/user-controller');
const authMiddleware = require('../../middlewares/authMiddleware');

router.post('/register', UserController.createUser);
router.post('/signIn', UserController.signIn);
router.post('/normal', authMiddleware, (req, res) => {
    console.log("req ", req);
    
    return res.status(200).json({msg: 'hello', data: req});
});

module.exports = router;