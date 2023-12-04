import { SetMetadata } from '@nestjs/common';
import { RI_RESOLVER } from '../constants';
import { RiResolver } from '../models/ri-resolver';

export const UseRiResolver = (resolver: RiResolver) => SetMetadata(RI_RESOLVER, resolver);
