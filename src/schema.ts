import { makeExecutableSchema, IResolverObject, IEnumResolver } from 'graphql-tools';
import { SpotifyClient, SpotifyFullArtist } from './resources/spotify';
import { artistTypeDefs, artistResolvers } from './domains/artists/schema';
import { albumTypeDefs, albumResolvers } from './domains/albums/schema';

export type Context = {
  spotifyClient: SpotifyClient;
};

export type RootResolver = {
  ReleaseDatePrecision: IEnumResolver;
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

  enum CopyrightType {
    C
    P
  }

  enum ReleaseDatePrecision {
    YEAR
    MONTH
    DAY
  }

  type Query {
    artist(id: ID!): Artist
  }

`,
];

const rootResolvers: RootResolver = {
  // ENUM
  ReleaseDatePrecision: {
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
  },

  // API
  Query: {
    artist: (_, args, context): Promise<SpotifyFullArtist> => {
      return context.spotifyClient.getArtist({ id: args.id });
    },
  },
};

const typeDefs = [...rootTypeDefs, ...artistTypeDefs, ...albumTypeDefs];

const resolvers = {
  ...rootResolvers,
  ...artistResolvers,
  ...albumResolvers,
};

export const schema = makeExecutableSchema<Context>({
  typeDefs,
  resolvers,
});
