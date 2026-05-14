const express = require("express")
const requestService = require("../service/request.js")
const requestRouter = express.Router()

requestRouter.post("/request", createNewRequest)
requestRouter.post("/request/status", updateRequestStatus)
requestRouter.post("/review", addCourseReview)
requestRouter.get("/request", getUserRequests)
requestRouter.get("/request/all", getAllRequests)

async function createNewRequest(req, res) {
    const userId = req.body.users_id
    const courseName = req.body.name_course
    const startDate = req.body.start_date
    const paymentType = req.body.type_pay
    const endDate = req.body.end_date

    const requestData = {
        users_id: userId,
        name_course: courseName,
        start_date: startDate,
        type_pay: paymentType,
        end_date: endDate
    }

    try {
        const createdRequest = await requestService.createRequest(requestData)

        res.status(200).json({
            success: true,
            data: createdRequest
        })
    } catch (err) {
        console.error("Request error:", err)
        res.status(500).json({ error: err.message })
    }
}

async function updateRequestStatus(req, res) {
    const userId = req.body.users_id
    const courseName = req.body.name_course
    const requestStatus = req.body.status

    const statusData = {
        users_id: userId,
        name_course: courseName,
        status: requestStatus
    }

    try {
        const updatedRequest = await requestService.updateStatus(statusData)

        res.status(200).json({
            success: true,
            data: updatedRequest
        })
    } catch (err) {
        console.error("Request error:", err)
        res.status(500).json({ error: err.message })
    }
}

async function addCourseReview(req, res) {
    const userId = req.body.users_id
    const courseName = req.body.name_course
    const reviewText = req.body.review

    const reviewData = {
        users_id: userId,
        name_course: courseName,
        review: reviewText
    }

    try {
        const createdReview = await requestService.createReview(reviewData)

        res.status(200).json({
            success: true,
            data: createdReview
        })
    } catch (err) {
        console.error("Request error:", err)
        res.status(500).json({ error: err.message })
    }
}

async function getUserRequests(req, res) {
    const userId = req.query.users_id

    try {
        const userRequests = await requestService.getRequest(parseInt(userId))

        res.status(200).json({
            success: true,
            data: userRequests
        })
    } catch (err) {
        console.error("Request error:", err)
        res.status(500).json({ error: err.message })
    }
}

async function getAllRequests(req, res) {
    try {
        const allRequests = await requestService.getAllRequest()

        res.status(200).json({
            success: true,
            data: allRequests
        })
    } catch (err) {
        console.error("Request error:", err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = requestRouter