const dotenv = require('dotenv').config();
const config = {
    db: {
        development: {
            database: process.env.DB_DATABASE || 'test',
            username: process.env.DB_USER || 'test',
            password: process.env.DB_PASSWORD || 'test',
            host: process.env.DB_HOST || 'test',
            port: process.env.DB_PORT || 'test',
            dialect: "mysql",
            define: {
                freezeTableName: true,
                timestamps: true,
            }
        },
        test: {
            database: process.env.DB_DATABASE || 'test',
            username: process.env.DB_USER || 'test',
            password: process.env.DB_PASSWORD || 'test',
            host: process.env.DB_HOST || 'test',
            port: process.env.DB_PORT || 'test',
            dialect: "mysql",
            define: {
                freezeTableName: true,
                timestamps: true,
            }
        }
    }
}

module.exports = config;