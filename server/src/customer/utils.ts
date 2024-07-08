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

// temporary workaround because data received by BE has braces in keys
// we should probably use POST instead of GET but I got not much time left
const removeBracesInObjectKeys = <T extends Record<string, unknown>>(obj: T): T => {
  const newObj = {} as T;

  for (const key in obj) {
    // eslint-disable-next-line no-useless-escape
    const newKey = key.replace(/[\[\]]/g, '');
    if (Array.isArray(obj[key])) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newObj[newKey] = (obj[key] as Array<any>).map((item) =>
        typeof item === 'object' && item !== null ? removeBracesInObjectKeys(item) : item,
      );
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newObj[newKey] = removeBracesInObjectKeys(obj[key] as Record<string, unknown>);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
};

const replaceStringTrueWithBooleanTrue = <T extends Record<string, unknown>>(obj: T): T => {
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

export const sanitizeFilters = <T extends Record<string, unknown>>(filters: T | undefined): T | undefined => {
  if (typeof filters !== 'object' || filters === null) {
    return undefined;
  }

  let newFilters = removeBracesInObjectKeys(filters);
  newFilters = replaceStringTrueWithBooleanTrue(newFilters);
  return newFilters;
};
