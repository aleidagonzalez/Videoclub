const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({

    id: { type: Number, require: true },
    name: { type: String, require: true },
    creator: { type: String, require: true },
    rating: { type: Number, require: true },
    dates: { type: Date, require: true }
},
    {
        collection: "movies",
        timestamps: true
    }
)
const movies = mongoose.model("movies", moviesSchema)

module.exports = movies;