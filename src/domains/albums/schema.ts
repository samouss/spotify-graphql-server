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
  decodeConnectionOffsetCursor,
  createConnectionOffsetResolvers,
  createConnectionEdgeResolvers,
  Connection,
  EdgeSource,
  Edge,
} from '../../connection';
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

  # The precision with which "releaseDate" value is known.
  enum ReleaseDatePrecision {
    YEAR
    MONTH
    DAY
  }

  # The type of copyright.
  enum CopyrightType {
    # The copyright.
    C

    # The sound recording (performance) copyright.
    P
  }

  # The copyright statements of the album.
  type Copyright {
    # The copyright text for this album.
    text: String!

    # The type of copyright.
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
    # @WEAK: See SpotifyAlbumGroup
    #
    # The field is present when getting an artist’s albums. Possible values are "album", "single",
    # "compilation", "appears_on". Compare to "albumType" this field represents relationship between
    # the artist and the album.
    albumGroup: String

    # @WEAK: See SpotifyAlbumType
    #
    # The type of the album: one of "album" , "single" , or "compilation".
    albumType: String!

    # The artists of the album.
    artists: [Artist!]!

    # The markets in which the album is available: ISO 3166-1 alpha-2 country codes. Note that an
    # album is considered available in a market when at least 1 of its tracks is available
    # in that market.
    availableMarkets: [String!]!

    # The copyright statements of the album.
    copyrights: [Copyright!]!

    # Known external IDs for the album.
    externalIds: ExternalIds!

    # Known external URLs for this album.
    externalURLs: ExternalURLs!

    # A list of the genres used to classify the album. For example: "Prog Rock" , "Post-Grunge".
    # (If not yet classified, the array is empty.)
    genres: [String!]!

    # A link to the Web API endpoint providing full details of the album.
    href: String!

    # The Spotify ID for the album.
    id: ID!

    # The cover art for the album in various sizes, widest first.
    images: [Image!]!

    # The label for the album.
    label: String!

    #	The name of the album. In case of an album takedown, the value may be an empty string.
    name: String!

    #	The popularity of the album. The value will be between 0 and 100, with 100 being the most
    # popular. The popularity is calculated from the popularity of the album’s individual tracks.
    popularity: Int!

    # The date the album was first released, for example "1981". Depending on the precision,
    # it might be shown as "1981-12" or "1981-12-15".
    releaseDate: Date!

    # The precision with which "releaseDate" value is known.
    releaseDatePrecision: ReleaseDatePrecision!

    # Part of the response when Track Relinking is applied, the original track is not available
    # in the given market, and Spotify did not have any tracks to relink it with. The track response
    # will still contain metadata for the original track, and a restrictions object containing the
    # reason why the track is not available: \`"restrictions" : {"reason" : "market"}\`
    restrictions: Restrictions!

    # The tracks of the album.
    tracks(first: Int = 10, after: ID): TrackConnection!

    # @WEAK: check support for litteral 'album'
    #
    #	The object type: "album"
    type: String!

    #	The Spotify URI for the album.
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
  TrackEdge: createConnectionEdgeResolvers(),
  TrackConnection: createConnectionOffsetResolvers(),
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
        const cursor = decodeConnectionOffsetCursor(args.after);

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
