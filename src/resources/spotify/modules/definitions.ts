export type SpotifyExternalURLS = {
  [key: string]: string;
};

export type SpotifyFollowers = {
  href: null;
  total: number;
};

export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

export type Pagination<T> = {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};
