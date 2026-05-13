import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const favoriteCitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    lat: Number,
    lon: Number
  },
  { _id: true, timestamps: true }
);

const searchHistorySchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    condition: String,
    temperature: Number
  },
  { _id: true, timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    favoriteCities: [favoriteCitySchema],
    searchHistory: [searchHistorySchema]
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
