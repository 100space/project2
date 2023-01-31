require("dotenv").config()

const host = process.env.DB_HOST
const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env_DB_PASSWORD
const database = process.env.DB_DATABASE

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db: {
        development: {
            username: user,
            password: password,
            database: database,
            port: port,
            host: host,
            dialect: "mysql"
        },
        test: {
            username: user,
            password: password,
            database: database,
            port: port,
            host: host,
            dialect: "mysql"
        }
    }
}

module.exports = config

