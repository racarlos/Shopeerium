const knex = require('knex')({              // Connect to the database
    connection: {
        host : process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    },
    client: 'mysql'
});

module.exports = knex