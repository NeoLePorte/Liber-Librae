//GifSpeech schema
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GifSpeechSchema = new Schema({
  title: String,
  speech: String,
  gif_url: String
});

export default mongoose.model('GifSpeech', GifSpeechSchema);