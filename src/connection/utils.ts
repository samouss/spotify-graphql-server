import { Cursor, OffsetCursor, BuiltInCursor } from './definitions';

export const createOffsetCursor = (value: number): OffsetCursor => ({
  type: 'offset',
  value,
});

export const createBuiltInCurosr = (value: string): BuiltInCursor => ({
  type: 'built-in',
  value,
});

export const encodeConnectionCuror = (cursor: Cursor) =>
  Buffer.from(`${cursor.type}:${cursor.value}`).toString('base64');

export const decodeConnectionOffsetCursor = (cursor: string): OffsetCursor => {
  const [type, value] = Buffer.from(cursor, 'base64')
    .toString('ascii')
    .split(':');

  if (type !== 'offset') {
    throw new Error('Curor: PARSE');
  }

  return {
    value: parseInt(value, 10),
    type,
  };
};
