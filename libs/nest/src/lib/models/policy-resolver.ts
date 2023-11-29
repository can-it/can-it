import { PolicyState } from '@can-it/types';

export type PolicyResolver = (req: unknown) => PolicyState;
