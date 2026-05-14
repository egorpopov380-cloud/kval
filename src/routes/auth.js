const express = require("express")
const authService = require("../service/auth.js")
const registrationRouter = express.Router()

registrationRouter.post("/reg", handleRegistration)
registrationRouter.post("/login", handleLogin)

async function handleRegistration(request, response) {
    const login = request.body.login
    const password = request.body.pass
    const fullName = request.body.fio
    const phoneNumber = request.body.phone
    const emailAddress = request.body.email

    const newUserInfo = {
        login: login,
        pass: password,
        fio: fullName,
        phone: phoneNumber,
        email: emailAddress
    }

    try {
        const createdUser = await authService.createUser(newUserInfo)

        response.status(201)
        response.json({
            success: true,
            data: createdUser
        })
    } catch (err) {
        console.log('Registration error:', err)
        response.status(500)
        response.json({ error: err.message })
    }
}

async function handleLogin(request, response) {
    const userLogin = request.body.login
    const userPassword = request.body.pass

    try {
        const foundUser = await authService.getUser(userLogin, userPassword)

        response.status(200)
        response.json({
            success: true,
            data: foundUser
        })
    } catch (err) {
        console.error("Login error:", err)
        response.status(500)
        response.json({ error: err.message })
    }
}

module.exports = registrationRouter