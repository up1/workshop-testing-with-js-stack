const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../app'); // Adjust path as needed
const userRepository = require('../repositories/user.repository');

// Mock dependencies
jest.mock('../repositories/user.repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Login Authentication', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should login successfully with valid credentials', async () => {
    // Mock data
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashedPassword'
    };
    
    // Setup mocks
    userRepository.findByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-token');

    // Test
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'fake-token');
  });

  it('should fail with incorrect password', async () => {
    // Mock data
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashedPassword'
    };

    // Setup mocks
    userRepository.findByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    // Test
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Username or password is incorrect');
  });

  it('should fail with non-existent username', async () => {
    // Setup mock
    userRepository.findByUsername.mockResolvedValue(null);

    // Test
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonexistent',
        password: 'password123'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Username or password is incorrect');
  });

  it('should handle server errors', async () => {
    // Setup mock to throw error
    userRepository.findByUsername.mockRejectedValue(new Error('Database error'));

    // Test
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Internal server error');
  });
});