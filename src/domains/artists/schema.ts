import { IResolverObject } from 'graphql-tools';
import {
  Pagination,
  GetArtistAlbumsOptions,
  SpotifyFullArtist,
  SpotifyFullAlbum,
} from '../../resources/spotify';
import {
  createOffsetCursor,
  encodePaginationCuror,
  decodePaginationOffsetCursor,
  Cursor,
} from '../../pagination';
import { Resolver } from '../../definitions';
import { Context } from '../../schema';
import { SpotifyGraphQLArtist } from './definitions';

type ConnectionPageInfoSource = {
  cursor: Cursor;
  hasNextPage: boolean;
};

type ArtistAlbumsEdgeSource = {
  node: SpotifyFullAlbum;
  cursor: Cursor;
};

type ArtistResolver = {
  PageInfo: IResolverObject<ConnectionPageInfoSource, Context>;
  AlbumEdge: IResolverObject<ArtistAlbumsEdgeSource, Context>;
  AlbumConnection: IResolverObject<Pagination<SpotifyFullAlbum>, Context>;
  Artist: Resolver<SpotifyGraphQLArtist, SpotifyFullArtist, Context>;
};

export const artistTypeDefs = [
  `

  type SpotifyFollowers {
    href: String
    total: Int!
  }

  type Image {
    url: String!
    width: Int!
    height: Int!
  }

  type PageInfo {
    endCursor: ID!
    hasNextPage: Boolean!
  }

  type AlbumEdge {
    cursor: ID!
    node: Album!
  }

  type AlbumConnection {
    edges: [AlbumEdge!]!
    nodes: [Album!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Artist {
    albums(first: Int = 10, after: ID): AlbumConnection!
    externalURLs: ExternalURLs!
    followers: SpotifyFollowers!
    genres: [String!]!
    href: String!
    id: ID!
    images: [Image!]!
    name: String!
    popularity: Int!
    relatedArtists: [Artist!]!
    topTracks: [Track!]!
    # @WEAK: check support for litteral 'artist'
    type: String!
    uri: String!
  }

`,
];

export const artistResolvers: ArtistResolver = {
  PageInfo: {
    endCursor: pageInfo => encodePaginationCuror(pageInfo.cursor),
    hasNextPage: pageInfo => pageInfo.hasNextPage,
  },
  AlbumEdge: {
    cursor: edge => encodePaginationCuror(edge.cursor),
    node: edge => edge.node,
  },
  AlbumConnection: {
    edges: page =>
      page.items.map((item, index) => ({
        node: item,
        cursor: createOffsetCursor(page.offset + (index + 1)),
      })),
    nodes: page => page.items,
    pageInfo: page => ({
      cursor: createOffsetCursor(page.offset + page.items.length),
      hasNextPage: page.total - (page.offset + page.limit) > 0,
    }),
    totalCount: page => page.total,
  },
  Artist: {
    albums: (artist, args, context) => {
      const options: GetArtistAlbumsOptions = {
        id: artist.id,
        limit: args.first,
      };

      if (args.after) {
        const cursor = decodePaginationOffsetCursor(args.after);

        options.offset = cursor.value;
      }

      return context.spotifyClient.getArtistAlbums(options).then(({ items, ...rest }) => {
        return context.spotifyClient
          .getAlbums({
            ids: items.map(album => album.id),
          })
          .then(albums => ({
            ...rest,
            items: albums,
          }));
      });
    },
    // @TODO @WEAK
    externalURLs: artist => artist.external_urls,
    // @TODO @WEAK
    followers: artist => artist.followers,
    genres: artist => artist.genres,
    href: artist => artist.href,
    id: artist => artist.id,
    // @TODO @WEAK
    images: artist => artist.images,
    name: artist => artist.name,
    popularity: artist => artist.popularity,
    // @TODO
    relatedArtists: () => [],
    // @TODO
    topTracks: () => [],
    // @WEAK
    type: artist => artist.type,
    uri: artist => artist.uri,
  },
};
