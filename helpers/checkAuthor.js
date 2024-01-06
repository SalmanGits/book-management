const checkAuthor = (authoIdInModel, authorId) => {
    if (authoIdInModel.toString() !== authorId.toString()) {
        return true
    }

    return false
}

module.exports = checkAuthor