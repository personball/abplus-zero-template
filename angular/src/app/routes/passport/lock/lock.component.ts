import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '@delon/theme';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppAuthService } from '@core/auth/app-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'passport-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.less']
})
export class UserLockComponent {
  f: FormGroup;

  constructor(
    fb: FormBuilder,
    private _appAuthService: AppAuthService,
    private _router: Router,
    public settings: SettingsService,
    public session: AppSessionService
  ) {
    _appAuthService.logout();
    this.f = fb.group({
      password: [null, Validators.required],
    });
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
      this.f.controls[i].updateValueAndValidity();
    }
    if (this.f.valid) {
      // TODO 显示用户头像
      this._appAuthService.login(this.session.user.userName, this.f.controls.password.value, true, () => {
        this._router.navigate(['dashboard']);
      });
    }
  }
}
