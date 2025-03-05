const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 8002,
    JWT_KEY: process.env.JWT_KEY,
}