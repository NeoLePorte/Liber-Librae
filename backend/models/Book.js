//user schema
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  ISBN: Number  
});

export default mongoose.model('Book', BookSchema);