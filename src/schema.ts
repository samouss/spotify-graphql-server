import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { SpotifyClient } from './resources/spotify';
import { artistTypeDefs, artistResolvers } from './artists/schema';
import { albumTypeDefs, albumResolvers } from './albums/schema';

export type Context = {
  spotifyClient: SpotifyClient;
};

const rootTypeDefs = [
  `

  type Query {
    artist(id: ID!): Artist
  }

`,
];

const rootResolvers: IResolvers<null, Context> = {
  Query: {
    artist: (_, args, context) => {
      return context.spotifyClient.getArtist({
        id: args.id,
      });
    },
  },
};

const typeDefs = [...rootTypeDefs, ...artistTypeDefs, ...albumTypeDefs];

const resolvers = {
  ...rootResolvers,
  ...artistResolvers,
  ...albumResolvers,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
