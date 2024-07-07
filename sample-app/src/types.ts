// We want to copy instead of import since we are not necessarily deploy FE and BE together
export interface Customer {
  id: string;
  priority: "Low" | "Medium" | "High";
  status: "Negotiation" | "Closed" | "Proposal" | "Lost" | "Qualified" | "Lead";
  expectedClose: string;
  added: string;
  phone: string;
  estimatedValue: number;
  email: string;
  name: string;
  lastContact: string;
  company: string;
}

export type CustomerField = keyof Customer;
