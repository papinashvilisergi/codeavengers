export type Loan = {
  name: string;
  total_due: string;
  due_date: string;
  amount_paid: string;
  total_months: number;
  monthly_payment: string;
  id: number;
  progress: number;
  months_remaining: number;
};

export type Bills = {
  name: string;
  id: number;
  subscriber_number: string;
  address: string;
  total_due: number;
  due_date: string;
};

export type Request = {
  bills: number;
  personal_number: number;
};
export type LoanRequest = {
  loan: number;
  personal_number: number;
  percentage: number;
};

export type LoanDetails = {
  monthly_payment: number;
  name: string;
  due_date: string;
  months_remaining: number;
  total_due: number;
};

export type Sender = {
  first_name: string;
  id: number;
  last_name: string;
  personal_number: string;
};

export type UtilityDetails = {
  total_due: number;
  name: string;
  address: string;
  due_date: string;
  subscriber_number: string;
  owner: string;
};

export type RequestType = {
  id: number;
  share_percentage: number;
  status: string;
  utility_details: UtilityDetails;
  loan_details: LoanDetails;
  sender: Sender;
};

export type billsRequests = {
  utility: number;
  receiver: {
    personal_number: string;
    share_percentage: number;
  }[];
};

export type loanRequests = {
  loan: number;
  receiver: {
    personal_number: string;
    share_percentage: number;
  }[];
};
