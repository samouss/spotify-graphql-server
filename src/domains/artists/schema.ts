import { IResolverObject } from 'graphql-tools';
import {
  Pagination,
  GetArtistAlbumsOptions,
  SpotifyFullArtist,
  SpotifyFullAlbum,
} from '../../resources/spotify';
import { encodePaginationCuror, decodePaginationOffsetCursor } from '../../pagination';
import { Resolver } from '../../definitions';
import { Context } from '../../schema';
import { SpotifyGraphQLArtist } from './definitions';

type ArtistAlbumsEdgeSource = {
  node: SpotifyFullAlbum;
  nodeOffset: number;
};

type ArtistResolver = {
  PageInfo: IResolverObject<Pagination<SpotifyFullAlbum>, Context>;
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
    endCursor: page =>
      encodePaginationCuror({
        type: 'offset',
        value: page.offset + page.limit,
      }),
    hasNextPage: page => page.total - (page.offset + page.limit) > 0,
  },
  AlbumEdge: {
    cursor: edge =>
      encodePaginationCuror({
        type: 'offset',
        value: edge.nodeOffset,
      }),
    node: edge => edge.node,
  },
  AlbumConnection: {
    edges: page =>
      page.items.map((item, index) => ({
        node: item,
        nodeOffset: page.offset + (index + 1),
      })),
    nodes: page => page.items,
    pageInfo: page => page,
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
