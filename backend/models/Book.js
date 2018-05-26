//Book schema
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  isbn: Number  
});

export default mongoose.model('Book', BookSchema);