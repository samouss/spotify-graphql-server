import {
  Pagination,
  GetArtistAlbumsOptions,
  SpotifyFullArtist,
  SpotifyFullAlbum,
} from '../../resources/spotify';
import {
  decodeConnectionOffsetCursor,
  createConnectionOffsetResolvers,
  createConnectionEdgeResolvers,
  Connection,
  EdgeSource,
  Edge,
} from '../../connection';
import { Resolver } from '../../definitions';
import { Context } from '../../schema';
import { SpotifyGraphQLAlbum } from '../albums';
import { SpotifyGraphQLArtist } from './definitions';

type ArtistResolver = {
  AlbumEdge: Resolver<Edge<SpotifyGraphQLAlbum>, EdgeSource<SpotifyFullAlbum>, Context>;
  AlbumConnection: Resolver<Connection<SpotifyGraphQLAlbum>, Pagination<SpotifyFullAlbum>, Context>;
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

  enum ImageSize {
    S
    M
    L
  }

  type Artist {
    albums(
      first: Int = 10
      after: ID
      market: String
    ): AlbumConnection!

    externalURLs: ExternalURLs!

    followers: SpotifyFollowers!

    genres: [String!]!

    href: String!

    id: ID!

    # The cover art for the album in a given size, fallback on largest.
    image(size: ImageSize!): Image!

    images: [Image!]!

    name: String!

    popularity: Int!

    relatedArtists: [Artist!]!

    # @WEAK
    topTracks(market: String!): [Track!]!

    # @WEAK: check support for litteral 'artist'
    type: String!

    uri: String!
  }

`,
];

export const artistResolvers: ArtistResolver = {
  AlbumEdge: createConnectionEdgeResolvers(),
  AlbumConnection: createConnectionOffsetResolvers(),
  Artist: {
    albums: (artist, args, context) => {
      const options: GetArtistAlbumsOptions = {
        id: artist.id,
        limit: args.first,
      };

      if (args.after) {
        const cursor = decodeConnectionOffsetCursor(args.after);

        options.offset = cursor.value;
      }

      if (args.market) {
        options.market = args.market;
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
    // @TODO: re-use the resolver
    image: (artist, args) => {
      const [large, medium, small] = artist.images;

      switch (args.size) {
        case 'S': {
          return small || medium || large;
        }
        case 'M': {
          return medium || large;
        }
        case 'L': {
          return large;
        }
        default: {
          return large;
        }
      }
    },
    images: artist => artist.images,
    name: artist => artist.name,
    popularity: artist => artist.popularity,
    relatedArtists: (artist, _, context) =>
      context.spotifyClient.getArtistRelatedArtists({
        id: artist.id,
      }),
    topTracks: (artist, args, context) =>
      context.spotifyClient.getArtistTopTracks({
        id: artist.id,
        market: args.market,
      }),
    // @WEAK
    type: artist => artist.type,
    uri: artist => artist.uri,
  },
};
