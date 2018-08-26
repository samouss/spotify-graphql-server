import { IFieldResolver } from 'graphql-tools';
import { SpotifyFullAlbum, SpotifyAlbumCoppyright } from '../../resources/spotify';
import { Context } from '../../schema';
import { SpotifyGraphQLAlbum } from './definitions';

type Resolver<Entity, Source, Context> = { [K in keyof Entity]: IFieldResolver<Source, Context> };

type AlbumResolver = {
  Copyright: Resolver<SpotifyAlbumCoppyright, SpotifyAlbumCoppyright, Context>;
  Album: Resolver<SpotifyGraphQLAlbum, SpotifyFullAlbum, Context>;
};

export const albumTypeDefs = [
  `

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
  Copyright: {
    text: copyright => copyright.text,
    type: copyright => copyright.type,
  },
  Album: {
    albumGroup: album => album.album_group,
    albumType: album => album.album_type,
    artists: (album, _, context) => {
      return context.spotifyClient.getArtists({
        ids: album.artists.map(artist => artist.id),
      });
    },
    availableMarkets: album => album.available_markets,
    copyrights: album => album.copyrights,
    // @TODO
    externalIds: album => album.external_ids,
    // @TODO
    externalURLs: album => album.external_urls,
    genres: album => album.genres,
    href: album => album.href,
    id: album => album.id,
    // @TODO
    images: album => album.images,
    label: album => album.label,
    name: album => album.name,
    popularity: album => album.popularity,
    releaseDate: album => album.release_date,
    releaseDatePrecision: album => album.release_date_precision,
    restrictions: album => album.restrictions,
    tracks: () => [],
    type: album => album.type,
    uri: album => album.uri,
  },
};
