import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgData: { type: Buffer, required: true },     // Stores the raw binary data
  contentType: { type: String, required: true }  // Stores the file type (e.g., 'image/png')
});

const ImageModel = mongoose.model('Image', imageSchema);
module.exports = ImageModel;