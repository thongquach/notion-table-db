export interface Customer {
  id: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Negotiation' | 'Closed' | 'Proposal' | 'Lost' | 'Qualified' | 'Lead';
  expectedClose: string;
  added: string;
  phone: string;
  estimatedValue: number;
  email: string;
  name: string;
  lastContact: string;
  company: string;
}

export type GridSortModel = {
  field: string;
  sort: 'asc' | 'desc';
}[];

export type NotionSortModel = {
  property: string;
  direction: 'ascending' | 'descending';
}[];
