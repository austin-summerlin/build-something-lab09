import request from 'superagent';

export const fetchTagLine = async (favoriteCharacter) => {
  const tagline = await request
    .get(`https://futuramaapi.herokuapp.com/api/characters/${favoriteCharacter}/1`);

  return tagline;
};

