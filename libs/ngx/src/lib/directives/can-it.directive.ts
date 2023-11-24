import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../types/permission';
import { CanItService } from '../services/can-it.service';

const SHOWING_MODE = {
  none: 0,
  can: 1,
  else: 2,
};

@Directive({
  selector: '[canIt]'
})
export class CanItDirective implements OnInit, OnDestroy {
  @Input({ required: true }) canIt: Request;
  @Input() canItElse: TemplateRef<any>;

  private showing = SHOWING_MODE.none;
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private canItService: CanItService
  ) { }

  ngOnInit(): void {
    this.subscription = this.canItService.can(this.canIt).subscribe(can => {
      if (can) {
        return this.showCanContent();
      }

      if (this.canItElse) {
        return this.showElseContent();
      }
      
      this.hideContent();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private showElseContent() {
    if (this.showing === SHOWING_MODE.else) {
      return;
    }
    
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.canItElse);
    this.showing = SHOWING_MODE.else;
  }

  private showCanContent() {
    if (this.showing === SHOWING_MODE.can) {
      return;
    }

    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.showing = SHOWING_MODE.can;
    return;
  }

  private hideContent() {
    if (this.showing === SHOWING_MODE.none) {
      return;
    }
    this.viewContainer.clear();
    this.showing = SHOWING_MODE.none;
  }
}
