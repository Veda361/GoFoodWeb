import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  location: { type: String, default: "" },
  date: { type: Date, default: Date.now }
}, { timestamps: true }
);

export default mongoose.model('User', UserSchema);