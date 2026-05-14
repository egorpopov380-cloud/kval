function checkRequestData(inputData) {
    const hasData = inputData !== null && inputData !== undefined

    const hasValidUserId = hasData && typeof inputData.users_id === 'number'
    const hasValidCourseName = hasData && typeof inputData.name_course === 'string'
    const hasValidStartDate = hasData && typeof inputData.start_date === 'string'
    const hasValidPaymentType = hasData && typeof inputData.type_pay === 'string'
    const hasValidEndDate = hasData && typeof inputData.end_date === 'string'

    const allFieldsAreValid =
        hasData &&
        hasValidUserId &&
        hasValidCourseName &&
        hasValidStartDate &&
        hasValidPaymentType &&
        hasValidEndDate

    return allFieldsAreValid
}

function checkReviewData(submittedReview) {
    const hasData = submittedReview !== null && submittedReview !== undefined

    const hasValidUserId = hasData && typeof submittedReview.users_id === 'number'
    const hasValidCourseName = hasData && typeof submittedReview.name_course === 'string'
    const hasValidReviewText = hasData && typeof submittedReview.review === 'string'

    const allFieldsAreValid =
        hasData &&
        hasValidUserId &&
        hasValidCourseName &&
        hasValidReviewText

    return allFieldsAreValid
}

function checkStatusData(statusData) {
    const hasData = statusData !== null && statusData !== undefined

    const hasValidUserId = hasData && typeof statusData.users_id === 'number'
    const hasValidCourseName = hasData && typeof statusData.name_course === 'string'
    const hasValidStatusValue = hasData && typeof statusData.status === 'string'

    const allFieldsAreValid =
        hasData &&
        hasValidUserId &&
        hasValidCourseName &&
        hasValidStatusValue

    return allFieldsAreValid
}

module.exports = {
    validate: checkRequestData,
    validateReview: checkReviewData,
    validateStatus: checkStatusData
}