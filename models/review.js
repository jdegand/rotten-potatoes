const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({ 
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
 }, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;