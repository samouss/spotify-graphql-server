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
  [K in keyof TEntity]: IFieldResolver<TSource, TContext>
};

type ArtistAlbumsEdgeSource = {
  node: SpotifySimplifiedAlbum;
  nodeOffset: number;
};

type ArtistResolver = {
  Artist: ResolverObject<SpotifyGraphQLArtist, SpotifyFullArtist, Context>;
  PageInfo: IResolverObject<Pagination<SpotifySimplifiedAlbum>, Context>;
  ArtistAlbumsEdge: IResolverObject<ArtistAlbumsEdgeSource, Context>;
  ArtistAlbumsConnection: IResolverObject<Pagination<SpotifySimplifiedAlbum>, Context>;
};

export const artistTypeDefs = [
  `
  # @WEAK: https://spoti.fi/2zFfyUW
  scalar SpotifyExternalURLs

  type SpotifyFollowers {
    href: String
    total: Int!
  }

  type SpotifyImages {
    url: String!
    width: Int!
    height: Int!
  }

  type PageInfo {
    endCursor: ID!
    hasNextPage: Boolean!
  }

  type ArtistAlbumsEdge {
    cursor: ID!
    node: Album!
  }

  type ArtistAlbumsConnection {
    edges: [ArtistAlbumsEdge]!
    albums: [Album]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Artist {
    externalURLs: SpotifyExternalURLs!
    followers: SpotifyFollowers!
    genres: [String]!
    href: String!
    id: ID!
    images: SpotifyImages!
    name: String!
    popularity: Int!
    # @WEAK: check support for litteral
    type: String!
    uri: String!
    albumsConnection(first: Int = 10, after: ID): ArtistAlbumsConnection!
  }

`,
];

export const artistResolvers: ArtistResolver = {
  Artist: {
    externalURLs: artist => artist.external_urls,
    followers: artist => artist.followers,
    genres: artist => artist.genres,
    href: artist => artist.href,
    id: artist => artist.id,
    images: artist => artist.images,
    name: artist => artist.name,
    popularity: artist => artist.popularity,
    type: artist => artist.type,
    uri: artist => artist.uri,
    albumsConnection: (artist, args, context) => {
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
  },
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
  ArtistAlbumsEdge: {
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
  ArtistAlbumsConnection: {
    edges: (page): ArtistAlbumsEdgeSource[] => {
      return page.items.map((item, index) => ({
        node: item,
        nodeOffset: page.offset + (index + 1),
      }));
    },
    albums: (page): SpotifySimplifiedAlbum[] => {
      return page.items;
    },
    pageInfo: (page): Pagination<SpotifySimplifiedAlbum> => {
      return page;
    },
    totalCount: (page): number => {
      return page.total;
    },
  },
};
