import { Client } from '@notionhq/client';

import { Customer, GridSortModel } from './types';
import { convertQueryToCustomers, toNotionSortModel } from './utils';

const databaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!databaseId || !notionSecret) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

const notion = new Client({
  auth: notionSecret,
});

export const getCustomers = async (gridSortModel?: GridSortModel): Promise<Customer[]> => {
  const query = await notion.databases.query({
    database_id: databaseId,
    sorts: gridSortModel ? toNotionSortModel(gridSortModel) : undefined,
  });

  return convertQueryToCustomers(query);
};
