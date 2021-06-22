import { Router } from 'express';
import request from 'superagent';
import Profile from '../models/Profile.js';

export default Router()
  .post('/api/v1/profile', async (req, res, next) => {
    try {
      const fetchTagLine = await request
        .get(`https://futuramaapi.herokuapp.com/api/characters/${req.body.favoriteCharacter}`
        );
      console.log('TAGLINE:', fetchTagLine.body[0].quote);
      console.log('REQ BODY:', req.body);
      const profile = await Profile.createProfile(req.body, fetchTagLine.body[0].quote);
      res.send(profile);
    } catch (err) {
      next(err);
    }
  });

