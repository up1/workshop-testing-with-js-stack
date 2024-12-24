const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const userRepository = require('../repositories/user.repository');

jest.mock('../repositories/user.repository');
jest.mock('bcrypt');

describe('Register API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register successfully with valid data', async () => {
    // Setup mocks
    userRepository.findByUsernameOrEmail.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue('hashedPassword123');

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        email: 'newuser@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Register success' });
    expect(userRepository.createUser).toHaveBeenCalledWith(
      'newuser',
      'newuser@test.com',
      'hashedPassword123'
    );
  });

  it('should fail when username/email already exists', async () => {
    // Setup mock for existing user
    userRepository.findByUsernameOrEmail.mockResolvedValue({
      username: 'existinguser',
      email: 'existing@test.com'
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'existinguser',
        email: 'existing@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'User or password is duplicated' });
  });

  it('should handle server errors during registration', async () => {
    // Setup mock to simulate database error
    userRepository.findByUsernameOrEmail.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        email: 'newuser@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });

  it('should validate required fields', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: '',
        email: '',
        password: ''
      });

    expect(response.status).toBe(500);
  });
});