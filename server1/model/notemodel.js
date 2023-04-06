const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const notemodel = mongoose.model("notes", noteSchema);

module.exports = notemodel;
