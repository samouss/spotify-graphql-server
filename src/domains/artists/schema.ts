import { IResolverObject, IFieldResolver } from 'graphql-tools';
import {
  Pagination,
  GetArtistAlbumsOptions,
  SpotifyFullArtist,
  SpotifySimplifiedAlbum,
} from '../../resources/spotify';
import { encodePaginationCuror, decodePaginationOffsetCursor } from '../../pagination';
import { Context } from '../../schema';
import { SpotifyGraphQLArtist } from './definitions';

type ResolverObject<TEntity, TSource, TContext> = {
  // Implement Sync & Async resolvers with return types => TEntity[K]
  [K in keyof TEntity]: IFieldResolver<TSource, TContext>
};

type ArtistAlbumsEdgeSource = {
  node: SpotifySimplifiedAlbum;
  nodeOffset: number;
};

type ArtistResolver = {
  PageInfo: IResolverObject<Pagination<SpotifySimplifiedAlbum>, Context>;
  AlbumEdge: IResolverObject<ArtistAlbumsEdgeSource, Context>;
  AlbumConnection: IResolverObject<Pagination<SpotifySimplifiedAlbum>, Context>;
  Artist: ResolverObject<SpotifyGraphQLArtist, SpotifyFullArtist, Context>;
};

export const artistTypeDefs = [
  `

  # @WEAK: implement the track types
  type Track {
    name: String
  }

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
    endCursor: (page): string => {
      return encodePaginationCuror({
        type: 'offset',
        value: page.offset + page.limit,
      });
    },
    hasNextPage: (page): boolean => {
      return page.total - (page.offset + page.limit) > 0;
    },
  },
  AlbumEdge: {
    cursor: (edge): string => {
      return encodePaginationCuror({
        type: 'offset',
        value: edge.nodeOffset,
      });
    },
    node: (edge): SpotifySimplifiedAlbum => {
      return edge.node;
    },
  },
  AlbumConnection: {
    edges: (page): ArtistAlbumsEdgeSource[] => {
      return page.items.map((item, index) => ({
        node: item,
        nodeOffset: page.offset + (index + 1),
      }));
    },
    nodes: (page): SpotifySimplifiedAlbum[] => {
      return page.items;
    },
    pageInfo: (page): Pagination<SpotifySimplifiedAlbum> => {
      return page;
    },
    totalCount: (page): number => {
      return page.total;
    },
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

      return context.spotifyClient.getArtistAlbums(options);
    },
    externalURLs: artist => artist.external_urls,
    followers: artist => artist.followers,
    genres: artist => artist.genres,
    href: artist => artist.href,
    id: artist => artist.id,
    images: artist => artist.images,
    name: artist => artist.name,
    popularity: artist => artist.popularity,
    // @TODO
    relatedArtists: () => [],
    // @TODO
    topTracks: () => [],
    type: artist => artist.type,
    uri: artist => artist.uri,
  },
};
