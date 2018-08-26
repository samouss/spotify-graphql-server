import Hapi from 'hapi';
import {
  graphqlHapi,
  graphiqlHapi,
  HapiPluginOptions,
  HapiGraphiQLPluginOptions,
} from 'apollo-server-hapi';
import { createSpotifyClient } from './resources/spotify';
import { schema } from './schema';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const SPOTIFY_ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN || '';
// const SONGKICK_ACCESS_TOKEN = process.env.SONGKICK_ACCESS_TOKEN || '';

const GRAPHQL_ENDPOINT = '/';
const GRAPHIQL_ENDPOINT = '/graphiql';

async function runServer() {
  const server = new Hapi.Server({
    host: HOST,
    port: PORT,
  });

  await server.register<HapiPluginOptions>({
    plugin: graphqlHapi,
    options: {
      path: GRAPHQL_ENDPOINT,
      graphqlOptions: req => {
        const credentials = req!.headers['x-spotify-token'] || SPOTIFY_ACCESS_TOKEN;
        const spotifyClient = createSpotifyClient({
          credentials,
        });

        return {
          schema,
          context: {
            spotifyClient,
          },
        };
      },
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
