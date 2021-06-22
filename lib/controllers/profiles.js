import { Router } from 'express';
import Profile from '../models/Profile.js';
import { fetchTagLine } from '../utils/futuramaQuote.js';

export default Router()
  .post('/api/v1/profile', async (req, res, next) => {
    try {

      const quote = await fetchTagLine(req.body.favoriteCharacter);
      const profile = await Profile.createProfile(req.body, quote.body[0].quote);

      res.send(profile);

    } catch (err) {
      next(err);
    }
  })
  .get('/api/v1/profile/:id', async (req, res, next) => {
    try {

      const profile = await Profile.getProfile(req.params.id);
      res.send(profile);

    } catch (err) {
      next(err);
    }
  })
  .get('/api/v1/profile', async (req, res, next) => {
    try {

      const profiles = await Profile.getAllProfiles();
      res.send(profiles);

    } catch (err) {
      next(err);
    }
  })
  .put('/api/v1/profile/:id', async (req, res, next) => {
    try {

      const quote = await fetchTagLine(req.body.favoriteCharacter);
      const profile = await Profile.updateProfile(req.params.id, req.body.favoriteCharacter, quote.body[0].quote);
      res.send(profile);

    } catch (err) {
      next(err);
    }
  });

