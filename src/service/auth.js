const databaseConnection = require('../db/postgresql.js')
const passwordHasher = require('bcrypt')
const userValidator = require("../validators/user.validators");

async function registerNewUser(submittedData) {
    const isValid = userValidator.validate(submittedData)

    if (isValid === false) {
        console.error("Invalid data")
        throw new Error('Неверный формат данных')
    }

    const loginToCheck = submittedData.login
    const existenceCheckQuery = `SELECT EXISTS(SELECT * FROM users WHERE login = $1)`

    await databaseConnection.query(existenceCheckQuery, [loginToCheck])

    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const plainPassword = submittedData.pass
    const securedPassword = await passwordHasher.hash(plainPassword, saltRounds)

    const insertionQuery = `
    INSERT INTO users (
      login,
      pass,
      fio,
      phone,
      email
    )
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
  `

    const queryParameters = [
        submittedData.login,
        securedPassword,
        submittedData.fio,
        submittedData.phone,
        submittedData.email
    ]

    const insertedRecord = await databaseConnection.query(insertionQuery, queryParameters)

    return insertedRecord[0]
}

async function authenticateUser(userLogin, userPassword) {
    const loginIsString = typeof userLogin === 'string'
    const passwordIsString = typeof userPassword === 'string'

    const validationFailed = !(loginIsString && passwordIsString)

    if (validationFailed) {
        console.error("Invalid data")
        throw new Error('Неверный формат данных')
    }

    const userLookupQuery = `SELECT * FROM users WHERE login = $1`
    const foundUsers = await databaseConnection.query(userLookupQuery, [userLogin])
    const foundUser = foundUsers[0]

    console.log(foundUser)

    const passwordMatches = await passwordHasher.compare(userPassword, foundUser.pass)

    const isPasswordInvalid = passwordMatches === false

    if (isPasswordInvalid) {
        console.error("Invalid password")
        throw new Error('Неверный логин или пароль')
    }

    return foundUser
}

module.exports = {
    createUser: registerNewUser,
    getUser: authenticateUser
}