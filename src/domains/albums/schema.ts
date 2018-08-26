import { IEnumResolver } from 'graphql-tools';
import { SpotifyFullAlbum, SpotifyAlbumCoppyright } from '../../resources/spotify';
import { Resolver } from '../../definitions';
import { Context } from '../../schema';
import { SpotifyGraphQLAlbum } from './definitions';

type AlbumResolver = {
  ReleaseDatePrecision: IEnumResolver;
  Copyright: Resolver<SpotifyAlbumCoppyright, SpotifyAlbumCoppyright, Context>;
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

  # @WEAK: implement connection
  type TrackConnection {
    nodes: [Track!]!
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
    tracks: TrackConnection!
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
    tracks: () => [],
    // @WEAK
    type: album => album.type,
    uri: album => album.uri,
  },
};
