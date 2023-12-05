import { ExecutionContext } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export type RiResolver = (context: ExecutionContext, moduleRef: ModuleRef) => string | Promise<string>;
