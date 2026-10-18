const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema= new Schema({
    title: {
        type: String,
        requied: true
    },
    description: String,
    image: {
        type: String,
        default: "xyz",
        set: (v)=> v=== "" ? "default link" : v
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports= Listing;