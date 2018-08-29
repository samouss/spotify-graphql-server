import { Resolver } from '../definitions';
import { Context } from '../schema';
import { Cursor, PageInfo } from './definitions';
import { encodePaginationCuror } from './utils';

type ConnectionPageInfoSource = {
  cursor: Cursor;
  hasNextPage: boolean;
};

type ConnectionResolvers = {
  PageInfo: Resolver<PageInfo, ConnectionPageInfoSource, Context>;
};

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
