const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,//assuming book will be added by authors only
        ref: 'User',
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true //when false it means we have unpublished the book
    },
    genre: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
