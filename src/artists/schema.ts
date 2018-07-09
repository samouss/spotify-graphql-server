import { IResolverObject } from 'graphql-tools';
import { SpotifyFullArtist, SpotifySimplifiedAlbum } from '../resources/spotify';
import { Context } from '../schema';

type ArtistResolver = {
  Artist: IResolverObject<SpotifyFullArtist, Context>;
};

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

export const artistResolvers: ArtistResolver = {
  Artist: {
    id: (artist): string => artist.id,
    name: (artist): string => artist.name,
    popularity: (artist): number => artist.popularity,
    albums: (artist, _, context): Promise<SpotifySimplifiedAlbum[]> => {
      return context.spotifyClient
        .getArtistAlbums({ id: artist.id })
        .then(content => content.items);
    },
  },
};
