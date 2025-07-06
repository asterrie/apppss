const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {       // zahashowane hasło
    type: String,
    required: true,
  },
  className: {      // klasa 1-4
    type: String,
    required: true,
    enum: ['1', '2', '3', '4'],
  },
  extendedSubjects: {  // tablica przedmiotów rozszerzonych
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'Musisz wybrać co najmniej jeden przedmiot.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware do hashowania hasła przed zapisem
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Metoda do porównywania hasła przy logowaniu
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
