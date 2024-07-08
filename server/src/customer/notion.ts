import { Client } from '@notionhq/client';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { Customer } from './types';
import { convertQueryToCustomers } from './utils';

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
    filter: filter,
  });

  return convertQueryToCustomers(query);
};
