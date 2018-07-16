import { makeExecutableSchema, IResolverObject } from 'graphql-tools';
import { SpotifyClient, SpotifyFullArtist } from './resources/spotify';
import { artistTypeDefs, artistResolvers } from './domains/artists/schema';
import { albumTypeDefs, albumResolvers } from './domains/albums/schema';

export type Context = {
  spotifyClient: SpotifyClient;
};

export type RootResolver = {
  Query: IResolverObject<null, Context>;
};

const rootTypeDefs = [
  `

  type Query {
    artist(id: ID!): Artist
  }

`,
];

const rootResolvers: RootResolver = {
  Query: {
    artist: (_, args, context): Promise<SpotifyFullArtist> => {
      return context.spotifyClient.getArtist({ id: args.id });
    },
  },
};

const typeDefs = [...rootTypeDefs, ...artistTypeDefs, ...albumTypeDefs];

// @WEAK: Rewrite to support better generic support
const resolvers: any = {
  ...rootResolvers,
  ...artistResolvers,
  ...albumResolvers,
};

export const schema = makeExecutableSchema<Context>({
  typeDefs,
  resolvers,
});
