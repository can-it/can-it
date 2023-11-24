import { ModuleWithProviders, NgModule } from '@angular/core';
import { CanItDirective } from './directives/can-it.directive';
import { CanItPipe } from './pipes/can-it.pipe';
import { PolicyStore } from './services/policy-store.service';
import { CanItService } from './services/can-it.service';
import { ACTION_COMPARATOR, RI_COMPARATOR } from './constants/token';
import { Comparator } from '@can-it/core';

@NgModule({
  declarations: [
    CanItDirective,
    CanItPipe
  ],
  imports: [
  ],
  exports: [
    CanItDirective,

    CanItPipe
  ]
})
export class NgxCanItModule {
  public static forNewScope(
    comparators?: {
      action?: Comparator,
      ri?: Comparator
    }
  ): ModuleWithProviders<NgxCanItModule> {
    return {
      ngModule: NgxCanItModule,
      providers: [
        PolicyStore,

        CanItService,

        { provide: ACTION_COMPARATOR, useValue: comparators?.action },
        { provide: RI_COMPARATOR, useValue: comparators?.ri }
      ]
    }
  }

  public static forChild(): ModuleWithProviders<NgxCanItModule> {
    return {
      ngModule: NgxCanItModule,
      providers: []
    }
  }
}
