
const createPath = (path: string) => `${path}`;

export const routesPaths = {
    ROOT: createPath('/'),
    AUTH: createPath('/auth'),
    INSURANCE_PLANS: createPath('/insurance-plans'),
    CONNECT_WALLET: createPath('/connect-wallet'),
    MY_INSURANCE: createPath('/my-insurance'),
} as const;