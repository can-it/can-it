import { SetMetadata } from '@nestjs/common';
import { CAN_IT } from '../constants';
import { RiResolver } from '../models/ri-resolver';

export const CanIt = (
  action: string,
  ri?: string | RiResolver
) => SetMetadata(CAN_IT, [action, ri]);
