const sendResponse = require("../helpers/sendResponse");

const userRegisterValidator = (
    req,
    res,
    next
) => {
    const errors = {};
    errors.body = [];
    const { password, email, name, } = req.body;
    if (!password) {
        errors.body.push("password property can't be empty");
    } else if (typeof password != "string") {
        errors.body.push("password property must be a string");
    }

    if (!email) {
        errors.body.push("email property in user can't be empty");
    } else if (typeof email != "string") {
        errors.body.push("email property in user must be a string");
    }

    if (!name) {
        errors.body.push("name property can't be empty");
    } else if (typeof name != "string") {
        errors.body.push("name property must be a string");
    }

    if (errors.body.length) {
        sendResponse(res, { message: errors })
        return
    }

    next();
}


const userLoginValidator = (
    req,
    res,
    next
) => {
    const errors = {};
    errors.body = [];


    const { password, email } = req.body;
    if (!password) {
        errors.body.push("password property can't be empty");
    } else if (typeof password != "string") {
        errors.body.push("password property must be a string");
    }

    if (!email) {
        errors.body.push("email property in user can't be empty");
    } else if (typeof email != "string") {
        errors.body.push("email property in user must be a string");
    }


    if (errors.body.length) {
        sendResponse(res, { message: errors })
        return
    }

    next();
}

module.exports = { userRegisterValidator, userLoginValidator };
