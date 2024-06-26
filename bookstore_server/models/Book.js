import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  publishDate: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model('Book', BookSchema);
