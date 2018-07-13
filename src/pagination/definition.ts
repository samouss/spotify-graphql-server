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
