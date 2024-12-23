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
  const { username, password } = req.body;

  mockUser = {
    username: 'demo01',
    password: 'demo01password'
  }
  // Simple mock authentication
  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign(
      { username: mockUser.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  }

  return res.status(404).json({ message: 'User or password was incorrect' });
};
