const sendResponse = (res, obj) => {
    const { message, data, token, status=400, currentPage, totalPages, count,success=false } = obj
    return res.status(status).json({
        message,
        data,
        token,
        currentPage,
        totalPages,
        count,
        success
    })
}

module.exports = sendResponse