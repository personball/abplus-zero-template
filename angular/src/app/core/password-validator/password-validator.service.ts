import { Injectable } from '@angular/core';
import { SettingService } from 'abp-ng2-module/dist/src/settings/setting.service';
import { ErrorData } from '@delon/form';
import { AppConsts } from '@shared/AppConsts';

const ErrorMsgs = {
  requiredLength: '密码长度至少{0}位',
  requireDigit: '必须包含数字',
  requireUppercase: '必须包含大写字母',
  requireLowercase: '必须包含小写字母',
  requireNonAlphanumeric: '必须包含特殊字符'
};
const Patterns = {
  requireDigit: '[0-9]+',
  requireUppercase: '[A-Z]+',
  requireLowercase: '[a-z]+',
  requireNonAlphanumeric: '[^a-zA-Z0-9]+'
};

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  constructor(
    private abpSettings: SettingService
  ) { }
  private calls = [];

  init() {
    if (this.calls.length > 0) {
      return;
    }

    let that = this;
    for (const key in ErrorMsgs) {
      if (ErrorMsgs.hasOwnProperty(key)) {
        this.calls.push(this.generateValidator(key, that));
      }
    }
  }

  private generateValidator(key: string, that: any): (v: string) => ErrorData[] {
    if (key === 'requiredLength') {
      return (val: string) => {
        let len = this.abpSettings.getInt(AppConsts.passwordComplexity.requiredLength);
        if (len <= 0) {
          len = 3;
        }
        console.log(len);
        if (!val || val.length < len) {
          return [{ keyword: 'required', message: ErrorMsgs.requiredLength.replace('{0}', len.toString()) }];
        }
        return [];
      };
    } else {
      if (!that.abpSettings.getBoolean(AppConsts.passwordComplexity[key])) {
        return (val: string) => {
          return [];
        };
      }

      let regExp = new RegExp(Patterns[key]);
      return (val: string) => {
        if (!regExp.test(val)) {
          return [{ keyword: 'required', message: ErrorMsgs[key] }];
        }
        return [];
      };
    }
  }

  validate(v: string): ErrorData[] {
    if (this.calls.length === 0) {
      this.init();
    }

    for (let index = 0; index < this.calls.length; index++) {
      const call = this.calls[index];
      let err = call(v);
      if (err.length > 0) {
        return err;
      }
    }

    return [];
  }

}
