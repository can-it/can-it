import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanItPipe } from './can-it.pipe';
import { CanItService } from '../services/can-it.service';
import { Request } from '../types/permission';
import { ReplaySubject } from 'rxjs';
import { Component } from '@angular/core';
import { expectContent } from '../../spec-helpers/element';

@Component({
  template: '{{request | canIt | async}}',
})
class HostComponent {
  public request: Request = ['edit', 'user'];
}

describe('CanItPipe: with TestBed and HostComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let canItService: Pick<
    CanItService, 'can'
  >;
  const canSubject$ = new ReplaySubject<boolean>(1);

  beforeEach(async () => {
    canItService = {
      can: (_: Request) => {
        return canSubject$.asObservable();
      }
    };
    
    await TestBed.configureTestingModule({
      declarations: [CanItPipe, HostComponent],
      providers: [
        { provide: CanItService, useValue: canItService },
      ],
    }).compileComponents();

    canItService = TestBed.inject(CanItService);
    
    fixture = TestBed.createComponent(HostComponent);
  });

  it('should display "true" when the observable value returned by canItService is true', () => {
    canSubject$.next(true)
    fixture.detectChanges();
    expectContent(fixture).toEqual('true');
  });
  
  it('should display "false" when the observable value returned by canItService is false', () => {
    canSubject$.next(false);
    fixture.detectChanges();
    expectContent(fixture).toEqual('false');
  });

  it('should update the new value when the can method emits a new value', () => {
    canSubject$.next(true);
    fixture.detectChanges();
    expectContent(fixture).toEqual('true');

    canSubject$.next(false);
    fixture.detectChanges();
    expectContent(fixture).toEqual('false');
  });
});
