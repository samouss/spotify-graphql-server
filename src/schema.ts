import { makeExecutableSchema, IResolverObject } from 'graphql-tools';
import { SpotifyClient, SpotifyFullArtist, SpotifyFullAlbum } from './resources/spotify';
import { artistTypeDefs, artistResolvers } from './domains/artists/schema';
import { albumTypeDefs, albumResolvers } from './domains/albums/schema';
import { trackTypeDefs, trackResolvers } from './domains/tracks/schema';

export type Context = {
  spotifyClient: SpotifyClient;
};

export type RootResolver = {
  Query: IResolverObject<null, Context>;
};

const rootTypeDefs = [
  `

  # @WEAK: see SpotifyExternalURLs
  scalar ExternalURLs

  # @WEAK: see SpotifyExternalIds
  scalar ExternalIds

  # @WEAK: see SpotifyRestrictions
  scalar Restrictions

  # @WEAK
  scalar Date

  type Query {
    artist(id: ID!): Artist
    album(id: ID!): Album
  }

`,
];

const rootResolvers: RootResolver = {
  // API
  Query: {
    artist: (_, args, context): Promise<SpotifyFullArtist> => {
      return context.spotifyClient.getArtist({ id: args.id });
    },
    album: (_, args, context): Promise<SpotifyFullAlbum> => {
      return context.spotifyClient.getAlbum({ id: args.id });
    },
  },
};

// prettier-ignore
const typeDefs = [
  ...rootTypeDefs,
  ...artistTypeDefs,
  ...albumTypeDefs,
  ...trackTypeDefs
];

const resolvers = {
  ...rootResolvers,
  ...artistResolvers,
  ...albumResolvers,
  ...trackResolvers,
};

export const schema = makeExecutableSchema<Context>({
  typeDefs,
  resolvers,
});
