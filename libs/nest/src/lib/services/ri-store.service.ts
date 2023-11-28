import { ResourceState } from '@can-it/types';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RiStore<T = unknown> {
  public _ri?: string;
  public resource?: T;

  set state(state: ResourceState<T>) {
    this._ri = state.ri;
    this.resource = state.resource;
  }
}
