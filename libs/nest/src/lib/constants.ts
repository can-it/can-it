const PACKAGE_PREFIX = '@can-it/nest';

export const getConstant = (key: string) => [PACKAGE_PREFIX, '__', key].join()

export const COMPARATORS = getConstant('COMPARATORS');
export const POLICY_RESOLVER = getConstant('POLICY_RESOLVER');
export const RI_RESOLVER = getConstant('RI_RESOLVER');

export const USE_RI_RESOLVER = getConstant('use-ri-resolver');
export const CAN_IT = getConstant('can-it');
export const USE_POLICY_RESOLVER = getConstant('use-policy-resolver');
