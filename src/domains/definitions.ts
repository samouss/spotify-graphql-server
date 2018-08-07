// @WEAK: reference all possible restrictions
export type SpotifyRestrictions = {
  [key: string]: string;
};

// @WEAK: reference all possible URLs types
export type SpotifyExternalURLs = {
  [key: string]: string;
};

// @WEAK: reference all possible external ids
export type SpotifyExternalIds = {
  [key: string]: string;
};

// @WEAK: reference all available genres?
export type SpotifyGenres = string[];

export type SpotifyCopyright = {
  text: string;
  type: 'C' | 'P';
};

export type SpotifyFollowers = {
  href: string;
  total: number;
};

export type SpotifyImage = {
  height: string;
  url: number;
  width: number;
};
