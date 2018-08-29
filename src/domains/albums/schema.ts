import { IEnumResolver } from 'graphql-tools';
import {
  Pagination,
  GetAlbumTracksOptions,
  SpotifyFullAlbum,
  SpotifyAlbumCoppyright,
  SpotifyFullTrack,
} from '../../resources/spotify';
import { Resolver } from '../../definitions';
import { Context } from '../../schema';
import {
  createOffsetCursor,
  encodePaginationCuror,
  decodePaginationOffsetCursor,
  Connection,
  EdgeSource,
  Edge,
} from '../../pagination';
import { SpotifyGraphQLTrack } from '../tracks';
import { SpotifyGraphQLAlbum } from './definitions';

type AlbumResolver = {
  ReleaseDatePrecision: IEnumResolver;
  Copyright: Resolver<SpotifyAlbumCoppyright, SpotifyAlbumCoppyright, Context>;
  TrackEdge: Resolver<Edge<SpotifyGraphQLTrack>, EdgeSource<SpotifyFullTrack>, Context>;
  TrackConnection: Resolver<Connection<SpotifyGraphQLTrack>, Pagination<SpotifyFullTrack>, Context>;
  Album: Resolver<SpotifyGraphQLAlbum, SpotifyFullAlbum, Context>;
};

export const albumTypeDefs = [
  `

  enum ReleaseDatePrecision {
    YEAR
    MONTH
    DAY
  }

  enum CopyrightType {
    C
    P
  }

  type Copyright {
    text: String!
    type: CopyrightType!
  }

  type TrackEdge {
    cursor: ID!
    node: Track!
  }

  type TrackConnection {
    edges: [TrackEdge!]!
    nodes: [Track!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Album {
    # @WEAK: see SpotifyAlbumGroup
    albumGroup: String
    # @WEAK: see SpotifyAlbumType
    albumType: String!
    artists: [Artist!]!
    availableMarkets: [String!]!
    copyrights: [Copyright!]!
    externalIds: ExternalIds!
    externalURLs: ExternalURLs!
    genres: [String!]!
    href: String!
    id: ID!
    images: [Image!]!
    label: String!
    name: String!
    popularity: Int!
    releaseDate: Date!
    releaseDatePrecision: ReleaseDatePrecision!
    restrictions: Restrictions!
    tracks(first: Int = 10, after: ID): TrackConnection!
    # @WEAK: check support for litteral 'album'
    type: String!
    uri: String!
  }

`,
];

export const albumResolvers: AlbumResolver = {
  ReleaseDatePrecision: {
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
  },
  Copyright: {
    text: copyright => copyright.text,
    type: copyright => copyright.type,
  },
  TrackEdge: {
    cursor: edge => encodePaginationCuror(edge.cursor),
    node: edge => edge.node,
  },
  TrackConnection: {
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
  Album: {
    // @WEAK
    albumGroup: album => album.album_group,
    // @WEAK
    albumType: album => album.album_type,
    artists: (album, _, context) => {
      return context.spotifyClient.getArtists({
        ids: album.artists.map(artist => artist.id),
      });
    },
    availableMarkets: album => album.available_markets,
    copyrights: album => album.copyrights,
    // @TODO @WEAK
    externalIds: album => album.external_ids,
    // @TODO @WEAK
    externalURLs: album => album.external_urls,
    genres: album => album.genres,
    href: album => album.href,
    id: album => album.id,
    // @TODO @WEAK
    images: album => album.images,
    label: album => album.label,
    name: album => album.name,
    popularity: album => album.popularity,
    releaseDate: album => album.release_date,
    releaseDatePrecision: album => album.release_date_precision,
    restrictions: album => album.restrictions,
    tracks: (album, args, context) => {
      const options: GetAlbumTracksOptions = {
        id: album.id,
        limit: args.first,
      };

      if (args.after) {
        const cursor = decodePaginationOffsetCursor(args.after);

        options.offset = cursor.value;
      }

      return context.spotifyClient.getAlbumTracks(options).then(({ items, ...rest }) => {
        return context.spotifyClient
          .getTracks({
            ids: items.map(track => track.id),
          })
          .then(tracks => ({
            ...rest,
            items: tracks,
          }));
      });
    },
    // @WEAK
    type: album => album.type,
    uri: album => album.uri,
  },
};
