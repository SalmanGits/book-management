const checkAuthor = require("../helpers/checkAuthor")
const sendResponse = require("../helpers/sendResponse")
const Book = require("../models/book.model")

const createBook = async (req, res, next) => {
    try {
        const book = await Book.create({
            ...req.body,
            author: req.user.id
        })
        sendResponse(res, { status: 201, message: "book created", success: true })
    } catch (error) {
        next(error)

    }
}


const unpublishBook = async (req, res, next) => {
    try {
        const { bookId } = req.params
        const { id } = req.user
        const book = await Book.findById(bookId)
        if (book.isPublished) {
            //checkAuthor function is to check that the user which is unpublishing is same or not
            if (checkAuthor(book.author, id)) {
                sendResponse(res, { status: 403, message: "you can not unpublish this book" })
                return
            }
            book.isPublished = false
            await book.save()
            sendResponse(res, { status: 200, message: "book unpublished", success: true })
            return
        }
        sendResponse(res, { message: "book is already unpublished"})

    }
    catch (error) {
        next(error)
    }
}
const getBooksOfUser = async (req, res, next) => {
    try {
        const { id } = req.user
        const books = await Book.find({ author: id, isPublished: true }).populate("author")
        sendResponse(res, { status: 200, message: "All books of user", data: books, success: true })
    } catch (error) {
        next(error)
    }
}
const getAllBooks = async (req, res, next) => {
    try {


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalBooks = await Book.countDocuments({ isPublished: true });
        const totalPages = Math.ceil(totalBooks / limit);

        const books = await Book.find({ isPublished: true }).populate("author")
            .skip(skip)
            .limit(limit);

        sendResponse(res, {
            status: 200,
            message: "All books",
            data: books,
            count: totalBooks,
            currentPage: page,
            totalPages,
            success: true,
        });
    } catch (error) {
        next(error)
    }

}
const searchBooks = async (req, res, next) => {
    try {
        const { title } = req.query;
        const query = {
            isPublished: true
        };
        if (!title) {
            return sendResponse(res, {
                status: 400,
                message: 'Please provide a valid title for search',
                success: false,
            });
        }

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        const books = await Book.find(query).populate("author");

        sendResponse(res, {
            status: 200,
            message: 'Searched books',
            data: books,
            success: true,
        });

    }
    catch (error) {
        next(error)
    }
}


module.exports = {
    createBook,
    unpublishBook,
    getBooksOfUser,
    getAllBooks,
    searchBooks
}