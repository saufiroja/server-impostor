const request = require('supertest');
const { app } = require('../src/app');

describe('User API', () => {
  it('[negative] should register with Email already exists', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'halo1',
      email: 'halo1@gmail.com',
      password: '123',
    });
    expect(res.statusCode).toBe(500);
  });

  it('[negative] should get user profile user with error', async () => {
    const res = await request(app).get('/api/user/halo');
    expect(res.statusCode).toBe(500);
  });

  it('[negative] should get one by id with error', async () => {
    const res = await request(app).get(
      '/api/users/310f067e-9b43-11ec-b909-0242ac120002'
    );
    expect(res.statusCode).toBe(500);
  });

  it('[posotive] should register', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'halo1',
      email: 'halo1@gmail.com',
      password: '123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created successfully');
  });

  it('[posotive] should login', async () => {
    const res = await request(app).post('/api/login').send({
      email: 'halo1@gmail.com',
      password: '123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User logged in successfully');
  });
});
