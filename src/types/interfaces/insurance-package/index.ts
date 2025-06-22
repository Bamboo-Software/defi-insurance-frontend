import type {  IItem } from "../common";


export type InsuranceType = {
    INSURANCE_PURCHASE: 'insurance_purchase',
};

type TriggerCondition = 'greater_than' | 'less_than' | 'equal_to';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Region {
  province: string;
  coordinates: Coordinates;
}

export interface IInsurancePackageResponse extends IItem {
    name: string;
    price: number;
    description: string;
    riskType: string;
    region: Region;
    durationDays: number;
    cryptoCurrency: string;
    chain: string;
    payoutAmount: number;
    unit: string;
    triggerThreshold: number;
    triggerCondition: TriggerCondition;
    triggerMetric: string;
    triggerUnit: string;
    triggerWindowDays: number;
    active: boolean;
}

