const PACKAGE_PREFIX = '@can-it/nest';

const getConstant = (key: string) => [PACKAGE_PREFIX, key].join('::')

export const COMPARATORS = getConstant('COMPARATORS');
export const POLICY_RESOLVER = getConstant('POLICY_RESOLVER');
export const RI_RESOLVER = getConstant('RI_RESOLVER');

export const CAN_IT = getConstant('CAN_IT');

export const CAN_IT_CONFIGURATION = getConstant('CAN_IT_CONFIGURATION');
