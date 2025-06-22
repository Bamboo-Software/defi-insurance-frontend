/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IFilter, IItem } from "../common";
import type { IInsurancePackageResponse } from "../insurance-package";

export type InsuranceProvider = 'metamask' | 'walletconnect' | 'coinbase';
export type InsuranceType = 'insurance_purchase';
export type PurchaseStatus = 'awaiting_payment' | 'paid' | 'failed' | 'expired';
export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type UserRole = 'admin' | 'user' | 'moderator';
export type SocialType = 'x' | 'facebook' | 'telegram' | 'discord';

interface InsuredPeriod {
  start: string;
  end: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationSnapshot {
  province: string;
  coordinates: Coordinates;
}

interface UserSocial {
  id: string;
  socialType: SocialType;
  socialId: string;
}

interface UserData extends IItem {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  avatar: string;
  active: boolean;
  telegramLanguageCode: string;
  role: UserRole;
  referralCode: string;
  isTelegramPremium: boolean;
  estimatedTelegramAccountAge: string;
  pointsBalance: number;
  timezone: string;
  transactionCount: number;
  referralCount: number;
  achievementCount: number;
  lotteryEntries: number;
  doublePointsActive: boolean;
  doublePointsExpiresAt: string;
  isOnboarded: boolean;
  botId: string;
  isBot: boolean;
  socials: UserSocial[];
}

export interface IInsuranceTransactionFilter extends IFilter {
    type: InsuranceType,
    walletAddress: string
}

export interface IInsuranceTransactionResponse extends IItem {
  _id: string;
  userId: string;
  provider: InsuranceProvider;
  type: InsuranceType;
  purchaseStatus: PurchaseStatus;
  payoutStatus: PayoutStatus;
  walletAddress: string;
  tokenAmount: number;
  cryptoCurrency: string;
  chain: string;
  packageId: string;
  insuredPeriod: InsuredPeriod;
  triggerThreshold: number;
  riskType: string;
  locationSnapshot: LocationSnapshot;
  paidAmount: number;
  payoutAmount: number;
  purchaseAt: string;
  payoutAt: string;
  purchaseTxHash: string;
  payoutTxHash: string;
  weatherDataSnapshot: number;
  chainlinkRequestId: string;
  expiresAt: string;
  metadata: Record<string, any>;
  user: UserData;
  package: IInsurancePackageResponse;
}