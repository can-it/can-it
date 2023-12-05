import { PolicyState } from '@can-it/types';
import { ExecutionContext } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export type PolicyResolver = (context: ExecutionContext, moduleRef: ModuleRef) => PolicyState | Promise<PolicyState>;
