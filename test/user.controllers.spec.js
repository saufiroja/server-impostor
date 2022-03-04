const request = require('supertest');
const { app } = require('../src/app');

describe('User API', () => {
  it('should show all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('success get all user');
  });
  it('should show a user', async () => {
    const res = await request(app).get('/api/user/halo');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('success get profile user');
  });
  it('should get one user by username with error', async () => {
    const res = await request(app).get('/api/user/123');
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('User not found');
    expect(res.body.error).toBe('internal server error');
  });
  it('should get one by id with error', async () => {
    const res = await request(app).get(
      '/api/users/310f067e-9b43-11ec-b909-0242ac120002'
    );
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('User not found');
    expect(res.body.error).toBe('internal server error');
  });
  it('should update score user with error', async () => {
    const res = await request(app).put(
      '/api/users/00000000-0000-0000-0000-0000000000000'
    );
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe(
      'invalid input syntax for type uuid: "00000000-0000-0000-0000-0000000000000"'
    );
    expect(res.body.error).toBe('internal server error');
  });
});
