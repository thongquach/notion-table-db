import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { Customer } from './types';

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

export const replaceStringTrueWithBooleanTrue = <T extends Record<string, unknown>>(
  obj: T | undefined,
): T | undefined => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[key] = replaceStringTrueWithBooleanTrue(obj[key] as Record<string, unknown>);
    } else if (obj[key] === 'true') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[key] = true;
    }
  }

  return obj;
};
