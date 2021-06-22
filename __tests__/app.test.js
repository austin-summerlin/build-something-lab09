import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { fetchTagLine } from '../lib/utils/futuramaQuote.js';
import Profile from '../lib/models/Profile.js';

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

  it('get a profile by id via GET', async () => {
    const quote = await fetchTagLine('Fry');
    const profile = await Profile.createProfile({ name: 'User', favoriteCharacter: 'Fry' }, quote.body[0].quote);

    const res = await request(app).get(`/api/v1/profile/${profile.id}`);
    expect(res.body).toEqual(profile);
  });

  it('gets all profiles via GET', async () => {
    const quote1 = await fetchTagLine('Leela');
    const profile1 = await Profile.createProfile({ name: 'User', favoriteCharacter: 'Leela' }, quote1.body[0].quote);

    const quote2 = await fetchTagLine('Amy');
    const profile2 = await Profile.createProfile({ name: 'User2', favoriteCharacter: 'Amy' }, quote2.body[0].quote);

    const res = await request(app).get('/api/v1/profile');

    expect(res.body).toEqual([profile1, profile2]);
  });

  it('updates a profile by id via UPDATE', async () => {
    const quote = await fetchTagLine('Bender');
    const profile = await Profile.createProfile({ name: 'User', favoriteCharacter: 'Bender' }, quote.body[0].quote);
    profile.favoriteCharacter = 'Fry';
    const res = await request(app)
      .put(`/api/v1/profile/${profile.id}`)
      .send({ favoriteCharacter: 'Fry' });

    expect(res.body).toEqual({
      id: '1',
      name: 'User',
      favoriteCharacter: profile.favoriteCharacter,
      tagline: expect.not.stringContaining(profile.tagline)
    });
  });

  it('deletes a profile by id via DELETE', async () => {
    const quote = await fetchTagLine('Hermes');
    const profile = await Profile.createProfile({
      name: 'User',
      favoriteCharacter: 'Hermes',
    }, quote.body[0].quote);

    const res = await request(app).delete(`/api/v1/profile/${profile.id}`)
      .send(profile);
    expect(res.body).toEqual(profile);
  });
});

