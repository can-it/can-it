import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanItDirective } from './can-it.directive';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { CanItService } from '../services/can-it.service';
import { ReplaySubject } from 'rxjs';
import { Request } from '../types/permission';
import { expectContent } from '../../spec-helpers/element';

const DICTIONARY = {
  basic: {
    allow: 'basic::can_xjd',
    deny: 'basic::deny_shs'
  },
  usingElse: {
    allow: 'else::can_lsio',
    else: 'else::else-content_8se#'
  }
}

@Component({
  template: `
  <!-- basic canIt -->
  <div id="basic">
    <p *canIt="['edit', 'user']">{{text.basic.allow}}</p>
  </div>

  <!-- using else -->
  <div id="usingElse">
    <p *canIt="['edit', 'user'] else canNotAccess">{{text.usingElse.allow}}</p>
    <ng-template #canNotAccess>
      {{text.usingElse.else}}
    </ng-template>
  </div>
`
})
class HostComponent {
  text = DICTIONARY;
}

describe('CanItDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let canItService: Pick<CanItService, 'can'>;
  let canSubject$: ReplaySubject<boolean>;
  beforeEach(async () => {
    canItService = {
      can: (_: Request) => canSubject$.asObservable()
    }
    await TestBed.configureTestingModule({
      declarations: [HostComponent, CanItDirective],
      providers: [
        TemplateRef,
        ViewContainerRef,
        
        { provide: CanItService, useValue: canItService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    canSubject$ = new ReplaySubject<boolean>(1);
  })

  describe('> Basic Usage', () => {
    it('should show allow content when authorized', () => {
      canSubject$.next(true);
      fixture.detectChanges();

      expectContent(fixture, '#basic').toBe(DICTIONARY.basic.allow);
    });

    it('should hide content when not authorized', () => {
      canSubject$.next(false);
      fixture.detectChanges();

      expectContent(fixture, '#basic').toBeFalsy();
    });

    it('should update when the permissions are updated', () => {
      canSubject$.next(false);
      fixture.detectChanges();
      expectContent(fixture, '#basic').toBeFalsy();

      canSubject$.next(true);
      fixture.detectChanges();
      expectContent(fixture, '#basic').toContain(DICTIONARY.basic.allow);

      canSubject$.next(false);
      fixture.detectChanges();
      expectContent(fixture, '#basic').not.toContain(DICTIONARY.basic.allow);
    });
  })

  describe('> Using ELSE', () => {
    it('should allow content when authorized', () => {
      canSubject$.next(true);
      fixture.detectChanges();
      expectContent(fixture, '#usingElse').toBe(DICTIONARY.usingElse.allow);
    });

    it('should else content when not authorized', () => {
      canSubject$.next(false);
      fixture.detectChanges();
      expectContent(fixture, '#usingElse').toContain(DICTIONARY.usingElse.else);
    });

    it('should update when the permissions are updated', () => {
      canSubject$.next(false);
      fixture.detectChanges();
      expectContent(fixture, '#usingElse').toContain(DICTIONARY.usingElse.else);

      canSubject$.next(true);
      fixture.detectChanges();
      expectContent(fixture, '#usingElse').toContain(DICTIONARY.usingElse.allow);
      expectContent(fixture, '#usingElse').not.toContain(DICTIONARY.usingElse.else);

      canSubject$.next(false);
      fixture.detectChanges();
      expectContent(fixture, '#usingElse').not.toContain(DICTIONARY.usingElse.allow);
      expectContent(fixture, '#usingElse').toContain(DICTIONARY.usingElse.else);
    });
  });
});
