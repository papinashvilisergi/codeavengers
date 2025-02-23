export type loginType = {
  username: string;
  password: string;
};

export type Loan = {
  id: number;
  name: string;
  due_date: string;
  total_due: number;
  monthly_payment: number;
  amount_paid: string;
  months_remaining: number;
  total_months: number;
  progress: number;
};

export type Utilities = {
  name: string;
  id: number;
  subscriber_number: string;
  address: string;
  total_due: number;
  due_date: string;
};

export type UserInfo = {
  first_name: string;
  last_name: string;
  personal_number: string;
  // id:number;
  balance: string;
  loans: Loan[];
  utilities: Utilities[];
  avatar: string;
};
