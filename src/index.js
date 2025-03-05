const express = require('express');
const {PORT} = require('./config/serverConfig');
const ApiRouting = require('./routes/index');
const bodyParser = require('body-parser');
const db = require('./models/index');
const {User, Role} = require('./models/index');
async function startServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    if(process.env.DB_SYNC){
        db.sequelize.sync({alter:true});
    }

    app.use('/api', ApiRouting);
    // const u1 = await User.findByPk(1);
    // const r1 = await Role.findByPk(2);
    // // u1.addRole(r1);

    // const response = await u1.hasRole(r1);
    // console.log("response ", response);
    
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    })
}

startServer();