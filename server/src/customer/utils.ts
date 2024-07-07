import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { Customer, GridSortModel, NotionSortModel } from './types';

const PROPERTY_MAP = {
  priority: 'Priority',
  status: 'Status',
  expectedClose: 'Expected Close',
  added: 'Added',
  phone: 'Phone',
  estimatedValue: 'Estimated Value',
  email: 'Email',
  name: 'Name',
  lastContact: 'Last Contact',
  company: 'Company',
} as const;

const DIRECTION_MAP = {
  asc: 'ascending',
  desc: 'descending',
} as const;

export const toNotionSortModel = (gridSortModel: GridSortModel): NotionSortModel => {
  const notionSortModel = gridSortModel.map((sortObj) => {
    const { field, sort } = sortObj;

    return {
      property: PROPERTY_MAP[field as keyof typeof PROPERTY_MAP],
      direction: DIRECTION_MAP[sort],
    };
  });

  return notionSortModel;
};

export const convertQueryToCustomers = (query: QueryDatabaseResponse): Customer[] => {
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
