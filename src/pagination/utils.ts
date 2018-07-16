import { Cursor, OffsetCursor } from './definition';

export const encodePaginationCuror = (cursor: Cursor) =>
  Buffer.from(`${cursor.type}:${cursor.value}`).toString('base64');

export const decodePaginationOffsetCursor = (cursor: string): OffsetCursor => {
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