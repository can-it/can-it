import { Injectable, NestMiddleware, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class LoadPolicyMiddleware implements NestMiddleware {
  constructor() {

  }

  use(req: any, res: any, next: () => void) {
    next();
  }
}
