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
