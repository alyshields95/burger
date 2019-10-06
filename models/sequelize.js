const Sequelize = require('sequelize');
const keys = require('../keys.js')

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {

    sequelize = new Sequelize('burgerDatabase', keys.sqlUser, keys.sqlSecret, {
        host: 'localhost',
        dialect: 'mysql'
    });
}

module.exports = sequelize;