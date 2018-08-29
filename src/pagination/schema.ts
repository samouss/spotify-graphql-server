import { Pagination } from '../resources/spotify';
import { Resolver } from '../definitions';
import { Context } from '../schema';
import { Connection, Edge, EdgeSource, Cursor, PageInfo } from './definitions';
import { encodePaginationCuror, createOffsetCursor } from './utils';

type ConnectionPageInfoSource = {
  cursor: Cursor;
  hasNextPage: boolean;
};

type ConnectionResolvers = {
  PageInfo: Resolver<PageInfo, ConnectionPageInfoSource, Context>;
};

type ConnectionOffestResolver<T, U> = Resolver<Connection<T>, Pagination<U>, Context>;
type ConnectionEdgeResolver<T, U> = Resolver<Edge<T>, EdgeSource<U>, Context>;

export const connectionTypeDefs = [
  `

  type PageInfo {
    endCursor: ID!
    hasNextPage: Boolean!
  }

`,
];

export const connectionResolvers: ConnectionResolvers = {
  PageInfo: {
    endCursor: pageInfo => encodePaginationCuror(pageInfo.cursor),
    hasNextPage: pageInfo => pageInfo.hasNextPage,
  },
};

export const createConnectionEdgeResolvers = <T, U>(): ConnectionEdgeResolver<T, U> => ({
  cursor: edge => encodePaginationCuror(edge.cursor),
  node: edge => edge.node,
});

export const createConnectionOffsetResolvers = <T, U>(): ConnectionOffestResolver<T, U> => ({
  edges: page =>
    page.items.map((item, index) => ({
      cursor: createOffsetCursor(page.offset + (index + 1)),
      node: item,
    })),
  nodes: page => page.items,
  pageInfo: page => ({
    cursor: createOffsetCursor(page.offset + page.items.length),
    hasNextPage: page.total - (page.offset + page.limit) > 0,
  }),
  totalCount: page => page.total,
});
