import pool from '../utils/pool.js';

export default class Profile {
  id;
  name;
  favoriteCharacter;
  tagline;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.favoriteCharacter = row.favorite_character;
    this.tagline = row.tagline;
  }

  static async createProfile(profile, tagline) {
    const name = profile.name;
    const favoriteCharacter = profile.favoriteCharacter;

    const { rows } = await pool.query(`
    INSERT INTO profiles (name, favorite_character, tagline)
    VALUES ($1, $2, $3)
    RETURNING *`, [name, favoriteCharacter, tagline]);

    return new Profile(rows[0]);
  }
}




