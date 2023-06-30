const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model: Blog - Category
var blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique:true,
      // index:true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model('BlogCategory', blogCategorySchema);
