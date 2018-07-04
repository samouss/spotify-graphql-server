import { IResolvers } from 'graphql-tools';
import { SpotifyArtist } from '../resources/spotify';
import { Context } from '../schema';

export const artistTypeDefs = [
  `

  type Artist {
    id: ID!
    name: String!
    popularity: Int!
    albums: [Album]!
  }

`,
];

export const artistResolvers: IResolvers<SpotifyArtist, Context> = {
  Artist: {
    id: (artist: SpotifyArtist) => artist.id,
    name: (artist: SpotifyArtist) => artist.name,
    popularity: (artist: SpotifyArtist) => artist.popularity,
    albums: (artist: SpotifyArtist, _, context) => {
      return context.spotifyClient.getArtistAlbums({
        id: artist.id,
      });
    },
  },
};
