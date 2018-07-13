import { IResolverObject } from 'graphql-tools';
import {
  Pagination,
  GetArtistAlbumsOptions,
  SpotifyFullArtist,
  SpotifySimplifiedAlbum,
} from '../resources/spotify';
import { encodePaginationCuror, decodePaginationOffsetCursor } from '../pagination';
import { Context } from '../schema';

type ArtistAlbumsEdgeSource = {
  node: SpotifySimplifiedAlbum;
  nodeOffset: number;
};

type ArtistResolver = {
  Artist: IResolverObject<SpotifyFullArtist, Context>;
  PageInfo: IResolverObject<Pagination<SpotifySimplifiedAlbum>, Context>;
  ArtistAlbumsEdge: IResolverObject<ArtistAlbumsEdgeSource, Context>;
  ArtistAlbumsConnection: IResolverObject<Pagination<SpotifySimplifiedAlbum>, Context>;
};

export const artistTypeDefs = [
  `

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
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Artist {
    id: ID!
    name: String!
    popularity: Int!
    albumsConnection(first: Int = 10, after: ID): ArtistAlbumsConnection!
  }

`,
];

export const artistResolvers: ArtistResolver = {
  Artist: {
    id: (artist): string => artist.id,
    name: (artist): string => artist.name,
    popularity: (artist): number => artist.popularity,
    albumsConnection: (artist, args, context): Promise<Pagination<SpotifySimplifiedAlbum>> => {
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
    pageInfo: (page): Pagination<SpotifySimplifiedAlbum> => {
      return page;
    },
    totalCount: (page): number => {
      return page.total;
    },
  },
};
