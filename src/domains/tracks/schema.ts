import { SpotifyFullTrack, SpotifyTrackLink } from '../../resources/spotify';
import { Resolver } from '../../definitions';
import { Context } from '../../schema';
import { SpotifyGraphQLTrack, SpotifyGraphQLTrackLink } from './definitions';

type TrackResolvers = {
  TrackLink: Resolver<SpotifyGraphQLTrackLink, SpotifyTrackLink, Context>;
  Track: Resolver<SpotifyGraphQLTrack, SpotifyFullTrack, Context>;
};

export const trackTypeDefs = [
  `

  type TrackLink {
    externalURLs: ExternalURLs!
    href: String!
    id: String!
    type: String!
    uri: String!
  }

  type Track {
    album: Album!
    artists: [Artist!]!
    availableMarkets: [String!]!
    discNumber: Int!
    durationMS: Int!
    explicit: Boolean!
    externalIds: ExternalIds!
    externalURLs: ExternalURLs!
    href: String!
    id: String!
    isLocal: Boolean!
    isPlayable: Boolean
    linkedFrom: TrackLink
    name: String!
    popularity: Int!
    previewURL: String
    restrictions: Restrictions
    trackNumber: Int!
    # @WEAK: check support for litteral 'track'
    type: String!
    uri: String!
  }

`,
];

export const trackResolvers: TrackResolvers = {
  TrackLink: {
    externalURLs: trackLink => trackLink.external_urls,
    href: trackLink => trackLink.href,
    id: trackLink => trackLink.id,
    type: trackLink => trackLink.type,
    uri: trackLink => trackLink.uri,
  },
  Track: {
    // @NOTE: over fetch
    album: (track, _, context) =>
      context.spotifyClient.getAlbum({
        id: track.album.id,
      }),
    // @NOTE: over fetch
    artists: (track, _, context) =>
      context.spotifyClient.getArtists({
        ids: track.artists.map(artist => artist.id),
      }),
    availableMarkets: track => track.available_markets,
    discNumber: track => track.disc_number,
    durationMS: track => track.duration_ms,
    explicit: track => track.explicit,
    // @TODO @WEAK
    externalIds: track => track.external_ids,
    // @TODO @WEAK
    externalURLs: track => track.external_urls,
    href: track => track.href,
    id: track => track.id,
    isLocal: track => track.is_local,
    isPlayable: track => track.is_playable,
    linkedFrom: track => track.linked_from,
    name: track => track.name,
    popularity: track => track.popularity,
    previewURL: track => track.preview_url,
    restrictions: track => track.restrictions,
    trackNumber: track => track.track_number,
    type: track => track.type,
    uri: track => track.uri,
  },
};
