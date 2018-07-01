import Hapi from 'hapi';
import {
  graphqlHapi,
  graphiqlHapi,
  HapiPluginOptions,
  HapiGraphiQLPluginOptions,
} from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const GRAPHQL_ENDPOINT = '/';
const GRAPHIQL_ENDPOINT = '/graphiql';

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = `
  type Query {
    books: [Book]
  }

  type Book {
    title: String,
    author: String
  }
`;

const resolvers = {
  Query: {
    books: () => books,
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
      graphqlOptions: {
        schema,
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
