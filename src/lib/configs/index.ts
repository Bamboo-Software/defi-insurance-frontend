import avalancheAbi from './avalanche.json';

export const baseUrl = import.meta.env.VITE_BASE_URL;
export const INSURANCE_CONTRACT_ADDRESS = import.meta.env.VITE_INSURANCE_CONTRACT_ADDRESS;
export const INSURANCE_CONTRACT_ABI = avalancheAbi;
export const INSURANCE_USDC_TOKEN_ADDRESS = import.meta.env.VITE_INSURANCE_USDC_TOKEN_ADDRESS;
