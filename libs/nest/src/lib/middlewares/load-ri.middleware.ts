import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { RiStore } from '../services/ri-store.service';
import { RI_RESOLVER } from '../constants';
import { ResourceState } from '@can-it/types';

@Injectable()
export class LoadRiMiddleware implements NestMiddleware {
  constructor(
    private riStore: RiStore,
    @Inject(RI_RESOLVER) private riResolver: (req: unknown) => ResourceState
  ) {}

  async use(req: unknown, _res: unknown, next: () => void) {
    this.riStore.state = await this.riResolver(req);

    next();
  }
}
