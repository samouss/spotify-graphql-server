import { IFieldResolver } from 'graphql-tools';

export type Resolver<Entity, Source, Context> = {
  [K in keyof Entity]: IFieldResolver<Source, Context>
};

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

export type SpotifyFollowers = {
  href: null;
  total: number;
};

export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};
