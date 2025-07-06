// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'tajny_klucz';

router.post('/register', async (req, res) => {
  const { username, password, className, extendedSubjects } = req.body;

  if (!username || !password || !className || !extendedSubjects?.length) {
    return res.status(400).json({ message: 'Brak wymaganych danych' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'Użytkownik już istnieje' });

    // Tworzymy nowego użytkownika z hasłem plain — middleware w modelu zahashuje
    const user = new User({ username, password, className, extendedSubjects });
    await user.save();

    return res.status(201).json({ message: 'Użytkownik zarejestrowany' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Brak wymaganych danych' });

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: 'Niepoprawna nazwa lub hasło' });

    // Tu zmieniamy na comparePassword
    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res.status(400).json({ message: 'Niepoprawna nazwa lub hasło' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      token,
      user: {
        username: user.username,
        className: user.className,
        extendedSubjects: user.extendedSubjects,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
});
