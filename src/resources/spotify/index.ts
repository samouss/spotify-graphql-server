// API
export { createSpotifyClient, SpotifyClient } from './client';

// Entity
export * from './modules/definitions';

export {
  GetArtistOptions,
  GetArtistAlbumsOptions,
  SpotifyFullArtist,
  SpotifySimplifiedArtist,
} from './modules/artists';

export { SpotifySimplifiedAlbum, SpotifyAlbumType } from './modules/albums';
