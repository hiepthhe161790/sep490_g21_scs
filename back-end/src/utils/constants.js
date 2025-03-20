const serverHostPort = process.env.HOST_PORT || 3333;
const serverHostUrl = process.env.HOST_NAME || '127.0.0.1'
const databaseUrl = process.env.DB_URI || "mongodb+srv://hoanghiep310102:wStjWWbAhnZcJwMO@hiepthdev.bafp7.mongodb.net/SCS?retryWrites=true&w=majority"
const temporaryDatabaseUrl = process.env.TEMP_DB_URI || "mongodb://localhost:27017/SCS"
const frontendUrl = process.env.FE_HOST_URL || "127.0.0.1:9999"

// config send email
const emailApp = process.env.EMAIL_APP || "broly1009a@gmail.com"
const passwordApp = process.env.PASS_APP || "bppy jwng cpfl trze"

module.exports = {
    serverHostPort,
    serverHostUrl,
    databaseUrl,
    temporaryDatabaseUrl,
    frontendUrl,
    emailApp,
    passwordApp,
}