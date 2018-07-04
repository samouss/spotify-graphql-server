import getArtist from './getArtist';

const createClient = () => {
  return {
    getArtist,
  };
};

export default createClient;
