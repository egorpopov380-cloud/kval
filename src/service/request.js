const databaseConnection = require("../db/postgresql.js")
const requestValidator = require("../validators/request.validators.js")

async function addNewRequest(submittedData) {
    const isValid = requestValidator.validate(submittedData)

    if (isValid === false) {
        console.error("Invalid data")
        throw new Error('Неверный формат данных')
    }

    const insertQuery = `
    INSERT INTO request (
      users_id,
      name_course,
      start_date,
      type_pay,
      status,
      end_date
    )
    VALUES ($1, $2, $3, $4, 'новая', $5) 
    RETURNING *
  `

    const queryParams = [
        submittedData.users_id,
        submittedData.name_course,
        submittedData.start_date,
        submittedData.type_pay,
        submittedData.end_date
    ]

    const insertedRequest = await databaseConnection.query(insertQuery, queryParams)

    return insertedRequest
}

async function addReviewForCourse(submittedData) {
    const isValid = requestValidator.validateReview(submittedData)

    if (isValid === false) {
        console.error("Invalid data")
        throw new Error('Неверный формат данных')
    }

    const reviewCheckQuery = `
    SELECT review 
    FROM request 
    WHERE users_id = $1 AND name_course = $2
  `

    const existingReviews = await databaseConnection.query(reviewCheckQuery, [
        submittedData.users_id,
        submittedData.name_course
    ])

    const reviewAlreadyExists = existingReviews === ''

    if (reviewAlreadyExists) {
        console.error("Request already exists")
        throw new Error('Отзыв уже оставлен')
    }

    const updateReviewQuery = `
    UPDATE request SET
      review = $3
    WHERE users_id = $1 AND name_course = $2
    RETURNING users_id, name_course, review
  `

    const updateParams = [
        submittedData.users_id,
        submittedData.name_course,
        submittedData.review
    ]

    const updatedReview = await databaseConnection.query(updateReviewQuery, updateParams)

    return updatedReview
}

async function modifyRequestStatus(submittedData) {
    const isValid = requestValidator.validateStatus(submittedData)

    if (isValid === false) {
        console.error("Invalid data")
        throw new Error('Неверный формат данных')
    }

    const statusUpdateQuery = `
    UPDATE request 
    SET status = $1 
    WHERE users_id = $2 AND name_course = $3
  `

    const updateParams = [
        submittedData.status,
        submittedData.users_id,
        submittedData.name_course
    ]

    const updatedStatus = await databaseConnection.query(statusUpdateQuery, updateParams)

    return updatedStatus
}

async function fetchUserRequests(userIdentification) {
    const userRequests = await databaseConnection.query(
        `SELECT * FROM request WHERE users_id = $1`,
        [userIdentification]
    )

    return userRequests
}

async function fetchAllRequests() {
    const allRequests = await databaseConnection.query(`SELECT * FROM request`)

    return allRequests
}

module.exports = {
    createRequest: addNewRequest,
    createReview: addReviewForCourse,
    getRequest: fetchUserRequests,
    getAllRequest: fetchAllRequests,
    updateStatus: modifyRequestStatus
}