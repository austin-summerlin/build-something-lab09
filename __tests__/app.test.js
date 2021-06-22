import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// import { fetchTagLine } from '../lib/utils/futuramaQuote.js';
// import Profile from '../lib/models/Profile.js';

describe('profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('create a profile for user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/profile')
      .send({
        name: 'User',
        favoriteCharacter: 'Bender'
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'User',
      favoriteCharacter: 'Bender',
      tagline: expect.any(String)
    });
  });
});
