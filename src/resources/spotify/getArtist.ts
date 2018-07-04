import requester from './requester';

type GetArtistOptions = {
  id: string;
  credentials: string;
};

const getArtist = ({ id, credentials }: GetArtistOptions) =>
  requester({
    endpoint: `/artists/${id}`,
    method: 'GET',
    credentials,
  });

export default getArtist;
