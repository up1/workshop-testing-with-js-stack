const jwt = require('jsonwebtoken');

// This is a mock users array - in a real app, you'd use a database
const users = [
  {
    username: 'demo01',
    email: 'demo01@example.com',
    // In real app, this would be hashed
    password: 'demo01password'
  }
];


exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const userExists = users.some(
    user => user.username === username || user.email === email
  );

  if (userExists) {
    return res.status(400).json({ message: 'User or password is duplicated' });
  }

  // In a real app, you would hash the password before storing
  users.push({ username, email, password });

  return res.status(200).json({ message: 'Register success' });
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
