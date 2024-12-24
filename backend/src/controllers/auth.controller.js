const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await userRepository.findByUsernameOrEmail(username, email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User or password is duplicated' });
    }

    // In a real app, you would hash the password before storing
    await userRepository.createUser(username, email, password);

    return res.status(200).json({ message: 'Register success' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in database
    const user = await userRepository.findByUsername(username);
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
