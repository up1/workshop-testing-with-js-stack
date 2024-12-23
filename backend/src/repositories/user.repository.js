const { pool } = require('../config/database');

class UserRepository {
  async findByUsernameOrEmail(username, email) {
    try {
      const result = await pool.request()
        .input('username', username)
        .input('email', email)
        .query(`
          SELECT * FROM Users 
          WHERE username = @username OR email = @email
        `);
      return result.recordset[0];
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }

  async createUser(username, email, password) {
    try {
      await pool.request()
        .input('username', username)
        .input('email', email)
        .input('password', password)
        .query(`
          INSERT INTO Users (username, email, password)
          VALUES (@username, @email, @password)
        `);
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
}

module.exports = new UserRepository();
