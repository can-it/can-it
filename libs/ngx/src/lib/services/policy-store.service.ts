import { Injectable } from '@angular/core';
import { ReplaySubject, first } from 'rxjs';
import PolicyState from '../types/policy-state';

@Injectable({
  providedIn: 'root'
})
export class PolicyStore {
  private state$ = new ReplaySubject<PolicyState>(1);
  private initializedState: boolean;

  get() {
    return this.state$.asObservable();
  }

  set(permissions: PolicyState) {
    this.initializedState = true;
    this.state$.next(permissions);
  }

  update(stateResolver: (previousState?: PolicyState) => PolicyState) {
    if (this.initializedState) {
      this.state$
        .pipe(first())
        .subscribe(state => this.set(stateResolver(state)));
      return;
    }

    this.set(stateResolver());
  }
}
