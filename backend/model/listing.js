const mongoose = require('mongoose');
const listingschema =new mongoose.Schema({
title:String,
price:String,
locality:String,
details:String

});

module.exports = mongoose.model('listings',listingschema)