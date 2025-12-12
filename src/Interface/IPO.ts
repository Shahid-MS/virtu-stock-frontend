export interface Subscription {
  name: string;
  subsvalue: number | undefined;
}

export interface GMP {
  gmp: number | undefined;
  gmpDate: string | undefined;
  lastUpdated: string | undefined;
}

export interface issueSize {
  fresh: string;
  offerForSale: string;
  totalIssueSize: string;
}

export interface IPOInterface {
  id: string;
  name: string;
  symbol: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  listingDate: string;
  minPrice: number;
  maxPrice: number;
  minQty: number;
  logo: string;
  issueSize: issueSize;
  about: string;
  strengths: string[];
  risks: string[];
  subscriptions: Subscription[];
  gmp: GMP[];
  listedPrice: number;
  verdict: string;
  listingReturn: number;
  listingReturnPercent: number;
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

export interface AppliedIPOInterface {
  id: string;
  ipo: IPOInterface;
  appliedLot: number;
  allotment: string;
  appliedDate: Date;
  allotedIpo: AllotedInterface;
}

export interface AllotedInterface {
  id: string;
  allotedDate: Date;
  allotedLot: number;
  netReturn: number;
  netReturnPercent: number;
  sellPrice: number;
}

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  phone: string;
  instagramUrl: string;
  linkedinUrl: string;
}
