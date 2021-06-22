import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('create a profile for user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/profile')
      .send({
        name: 'Austin',
        favoriteCharacter: 'Dr. Zoidberg'
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Austin',
      favoriteCharacter: 'Dr. Zoidberg',
      tagline: expect.any(String)
    });
  });
});
