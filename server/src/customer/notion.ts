import { Client } from '@notionhq/client';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { Customer } from './types';
import { convertQueryToCustomers, sanitizeFilters } from './utils';

const databaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!databaseId || !notionSecret) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

const notion = new Client({
  auth: notionSecret,
});

export const getCustomers = async (
  sortModel?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter'],
): Promise<Customer[]> => {
  const query = await notion.databases.query({
    database_id: databaseId,
    sorts: sortModel,
    // TODO: maybe we should use POST instead of GET so that boolean is not converted to string and keys are not added braces
    filter: sanitizeFilters(filter),
  });
  return convertQueryToCustomers(query);
};
