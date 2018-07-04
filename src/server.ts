import Hapi from 'hapi';
import {
  graphqlHapi,
  graphiqlHapi,
  HapiPluginOptions,
  HapiGraphiQLPluginOptions,
} from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';
import createSpotifyClient from './resources/spotify';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const GRAPHQL_ENDPOINT = '/';
const GRAPHIQL_ENDPOINT = '/graphiql';

// 1. Move logic out
// 2. Define the shape of the schema (not the complete one)
// 3. Create a small client on top of Spotify
// 4. Resolve artists

// - Strucutre by domain - albums, artits ...

const credentials =
  'BQBok4KQ8OtE10mb0tmmQlPj4yb-5m2fAU6IcCM2v6DhFys7EfAGzgleqqF7y2_dUVnyZccw9P-COZ_1UsU';

const spotifyClient = createSpotifyClient();

const typeDefs = `
  type Query {
    artist(id: String!): Artist
  }

  type Artist {
    name: String,
    popularity: Int
  }
`;

const resolvers: any = {
  Query: {
    artist: (_: any, args: { id: string }) => {
      return spotifyClient
        .getArtist({
          id: args.id,
          credentials,
        })
        .then(content => ({
          name: content.body.name,
          popularity: content.body.popularity,
        }));
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function runServer() {
  const server = new Hapi.Server({
    host: HOST,
    port: PORT,
  });

  await server.register<HapiPluginOptions>({
    plugin: graphqlHapi,
    options: {
      path: GRAPHQL_ENDPOINT,
      graphqlOptions: () => ({
        schema,
      }),
      route: {
        cors: true,
      },
    },
  });

  await server.register<HapiGraphiQLPluginOptions>({
    plugin: graphiqlHapi,
    options: {
      path: GRAPHIQL_ENDPOINT,
      graphiqlOptions: {
        endpointURL: GRAPHQL_ENDPOINT,
      },
    },
  });

  try {
    await server.start();
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

runServer();
