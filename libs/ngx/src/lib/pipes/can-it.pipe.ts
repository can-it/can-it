import { Pipe, PipeTransform } from '@angular/core';
import { CanItService } from '../services/can-it.service';
import { Request } from '../types/permission';

@Pipe({
  name: 'canIt'
})
export class CanItPipe implements PipeTransform {
  constructor(
    private canItService: CanItService
  ) {}

  transform(action: Request) {
    return this.canItService.can(action);
  }
}
