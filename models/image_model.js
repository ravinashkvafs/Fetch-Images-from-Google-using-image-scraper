'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    keyword: {
        type: String,
        required: true
    },
    image_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('imageSchema', imageSchema);