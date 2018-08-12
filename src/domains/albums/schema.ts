import { IResolverObject } from 'graphql-tools';
import { SpotifyAlbumType, SpotifySimplifiedAlbum } from '../../resources/spotify';
import { Context } from '../../schema';

type AlbumResolver = {
  Album: IResolverObject<SpotifySimplifiedAlbum, Context>;
};

export const albumTypeDefs = [
  `

  type Copyrights {
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
    copyrights: Copyrights!
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
  Album: {
    albumType: (album): SpotifyAlbumType => {
      return album.album_type;
    },
    artists: (album, _, context) => {
      return album.artists.map(artist =>
        context.spotifyClient.getArtist({
          id: artist.id,
        }),
      );
    },
    id: (album): string => {
      return album.id;
    },
    label: (): string => {
      // @TODO
      return '';
    },
    name: (album): string => {
      return album.name;
    },
    popularity: () => {
      // @TODO
      return 10;
    },
  },
};
