import { Client } from '@notionhq/client';

import { Customer } from './types';

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!notionDatabaseId || !notionSecret) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

const notion = new Client({
  auth: notionSecret,
});

export const getCustomers = async (): Promise<Customer[]> => {
  const query = await notion.databases.query({
    database_id: notionDatabaseId,
  });

  const customers = query.results.map((page) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const properties = page.properties as any;
    const priority = properties.Priority.select.name;
    const status = properties.Status.select.name;
    const expectedClose = properties['Expected Close'].date.start;
    const added = properties.Added.created_time;
    const phone = properties.Phone.phone_number;
    const estimatedValue = properties['Estimated Value'].number;
    const email = properties.Email.email;
    const name = properties.Name.title[0].plain_text;
    const lastContact = properties['Last Contact'].date.start;
    const company = properties.Company.rich_text[0].plain_text;

    return {
      id: page.id,
      priority,
      status,
      expectedClose,
      added,
      phone,
      estimatedValue,
      email,
      name,
      lastContact,
      company,
    };
  });

  return customers;
};
