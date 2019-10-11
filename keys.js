require("dotenv").config();

sql = {
    sqlUser: process.env.SQL_USER,
    sqlSecret: process.env.SQL_SECRET
};

module.exports = sql;