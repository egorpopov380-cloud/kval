function checkUserData(inputData) {
    const dataExists = inputData !== null && inputData !== undefined

    const hasValidLogin = dataExists && typeof inputData.login === 'string'
    const hasValidPassword = dataExists && typeof inputData.pass === 'string'
    const hasValidFullName = dataExists && typeof inputData.fio === 'string'
    const hasValidPhone = dataExists && typeof inputData.phone === 'string'
    const hasValidEmail = dataExists && typeof inputData.email === 'string'

    const allFieldsAreCorrect =
        dataExists &&
        hasValidLogin &&
        hasValidPassword &&
        hasValidFullName &&
        hasValidPhone &&
        hasValidEmail

    return allFieldsAreCorrect
}

module.exports = {
    validate: checkUserData
}