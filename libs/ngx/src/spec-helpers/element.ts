import { ComponentFixture } from '@angular/core/testing';

export const expectContent = <T>(fixture: ComponentFixture<T>, selector?: string) => {
  let element = fixture.nativeElement;
  if (selector) {
    element = element.querySelector(selector);
  }

  return expect(element.textContent);
};
