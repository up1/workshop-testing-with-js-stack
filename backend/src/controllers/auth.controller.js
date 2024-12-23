const jwt = require('jsonwebtoken');

// This is a mock user - in a real app, you'd fetch from a database
const mockUser = {
  username: 'demo01',
  // In real app, this would be hashed
  password: 'demo01password'
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

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
