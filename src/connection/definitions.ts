export type OffsetCursorType = 'offset';
export type BuiltInCursorType = 'built-in';

export type OffsetCursor = {
  type: OffsetCursorType;
  value: number;
};

export type BuiltInCursor = {
  type: BuiltInCursorType;
  value: string;
};

export type Cursor = OffsetCursor | BuiltInCursor;

export type PageInfo = {
  endCursor: Cursor;
  hasNextPage: boolean;
};

export type EdgeSource<T> = {
  cursor: Cursor;
  node: T;
};

export type Edge<T> = {
  cursor: string;
  node: T;
};

export type Connection<T> = {
  edges: Edge<T>[];
  nodes: T[];
  pageInfo: PageInfo;
  totalCount: number;
};
