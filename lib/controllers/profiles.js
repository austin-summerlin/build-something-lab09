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
  });

