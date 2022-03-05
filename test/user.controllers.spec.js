const request = require('supertest');
const { app } = require('../src/app');

describe('User API', () => {
  // positive test
  it('should show all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('success get all user');
  });

  it('should get user profile', async () => {
    const res = await request(app).get('/api/user/halo1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('successfully retrieve data');
  });

  // negative test
  it('should get user profile user with error', async () => {
    const res = await request(app).get('/api/user/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('user not registered');
  });

  it('should get one by id with error', async () => {
    const res = await request(app).get(
      '/api/users/310f067e-9b43-11ec-b909-0242ac120002'
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('user not registered');
  });

  it('should register with email already exists', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'halo1',
      email: 'halo1@gmail.com',
      password: '123',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Email already exists');
  });
});
