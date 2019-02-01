import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { I18NService } from './i18n/i18n.service';
import { AppAuthService } from './auth/app-auth.service';
import { PasswordValidatorService } from './password-validator/password-validator.service';

@NgModule({
  providers: [
    I18NService,
    AppAuthService,
    PasswordValidatorService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
