import { Request } from '@can-it/types';
import { SetMetadata } from '@nestjs/common';

export const CanIt = (...request: Request) => SetMetadata('can-it', request);
