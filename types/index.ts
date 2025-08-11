export type TAppUser = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  created_at: string;
  wallet_id: string;
  currency: string;
  balance: any;
  chargebee_customer_id: string;
};

export type TAppUserState = {
  token: string;
  userData: TAppUser;
};