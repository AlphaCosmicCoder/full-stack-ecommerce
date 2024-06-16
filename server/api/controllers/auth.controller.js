const User = require('../../database/models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log('reg=>',req.body)
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { userId: user._id, isAdmin: user.isAdmin };
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register,
    login
}