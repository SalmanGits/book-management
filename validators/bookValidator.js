const sendResponse = require("../helpers/sendResponse");

const addBookValidator = (
    req,
    res,
    next
) => {
    const errors = {};
    errors.body = [];
    const { title, genre, description } = req.body;
    if (!title) {
        errors.body.push("title property can't be empty");
    } else if (typeof title != "string") {
        errors.body.push("title property must be a string");
    }

    if (!genre) {
        errors.body.push("genre property can't be empty");
    } else if (typeof title != "string") {
        errors.body.push("genre property must be a string");
    }
    if (!description) {
        errors.body.push("description property can't be empty");
    } else if (typeof title != "string") {
        errors.body.push("description property must be a string");
    }


    if (errors.body.length) {
        sendResponse(res, { message: errors })
        return
    }

    next();
}




module.exports = { addBookValidator };
