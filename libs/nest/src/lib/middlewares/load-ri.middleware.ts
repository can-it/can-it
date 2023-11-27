import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoadRiMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
