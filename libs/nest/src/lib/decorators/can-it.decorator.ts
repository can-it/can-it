import { Request } from '@can-it/types';
import { SetMetadata } from '@nestjs/common';
import { CAN_IT } from '../constants';

export const CanIt = (...request: Request) => SetMetadata(CAN_IT, request);
