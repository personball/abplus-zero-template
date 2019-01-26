import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { UserServiceProxy, CreateUserDto } from '@shared/service-proxies/service-proxies';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-setting-users-create',
  templateUrl: './create.component.html',
})
export class SettingUsersCreateComponent extends AppComponentBase {
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      userName: { type: 'string', title: '用户名', maxLength: 256 },
      emailAddress: { type: 'string', format: 'email', title: '邮箱地址', maxLength: 256 },
      surname: { type: 'string', title: '姓', maxLength: 64 },
      name: { type: 'string', title: '名字', maxLength: 64 },
      password: { type: 'string', title: '密码', ui: { type: 'password' } },
      confirm: {
        type: 'string',
        title: '确认密码',
        ui: {
          type: 'password',
          validator: (value: any, formProperty: FormProperty, form: PropertyGroup) => {
            return (form.value) && (value === form.value.password) ? [] : [{ keyword: 'required', message: '密码输入不一致！' }];
          }
        }
      },
      isActive: { type: 'boolean', title: '是否启用' },
      roleNames: {
        type: 'string',
        title: '角色',
        ui: {
          widget: 'checkbox',
          checkAll: true,
          asyncData: () => this.userService.getRoles().pipe(map(r => r.items.map(i => ({ label: i.displayName, value: i.name })))),
          default: []
        }
      }
    },
    required: ['userName', 'name', 'surname', 'emailAddress', 'password'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
  };

  constructor(
    private injector: Injector,
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private userService: UserServiceProxy
  ) {
    super(injector);
  }

  save(value: any) {
    this.loading = true;
    let user = CreateUserDto.fromJS(value);
    this.userService.create(user).subscribe(res => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
