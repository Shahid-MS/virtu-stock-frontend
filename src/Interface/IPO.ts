export interface Subscription {
  name: string;
  subsvalue: number;
}

export interface GMP {
  gmp: number;
  gmpDate: string;
  lastUpdated: string;
}

export interface issueSize {
  fresh: string;
  offerForSale: string;
  totalIssueSize: string;
}

export interface IPOInterface {
  id: string;
  ipoAlertId: string;
  name: string;
  symbol: string;
  type: string;
  status: string;
  infoUrl: string;
  nseInfoUrl: string;
  startDate: string;
  endDate: string;
  listingDate: string;
  minPrice: number;
  maxPrice: number;
  minQty: number;
  logo?: string;
  issueSize: issueSize;
  prospectusUrl: string;
  about: string;
  strengths: string[];
  risks: string[];
  subscriptions: Subscription[];
  gmp: GMP[];
  verdict: string;
}

export interface IPOsProps {
  ipos: IPOInterface[];
}

export interface IPOProps {
  ipo: IPOInterface;
}

export interface SubscriptionProps {
  subscription: Subscription[];
}
