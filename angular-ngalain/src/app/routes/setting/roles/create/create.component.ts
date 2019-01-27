import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';
import { RoleServiceProxy, CreateRoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-setting-roles-create',
  templateUrl: './create.component.html',
})
export class SettingRolesCreateComponent extends AppComponentBase {
  record: any = {};
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
      // roleNames: {
      //   type: 'string',
      //   title: '角色',
      //   ui: {
      //     widget: 'checkbox',
      //     checkAll: true,
      //     asyncData: () => this.userService.getRoles().pipe(map(r => r.items.map(i => ({ label: i.displayName, value: i.name })))),
      //     default: []
      //   }
      // }
    },
    required: ['userName', 'name', 'surname', 'emailAddress', 'password'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $no: {
      widget: 'text'
    },
    $href: {
      widget: 'string',
    },
    $description: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private injector: Injector,
    private msgSrv: NzMessageService,
    private roleService: RoleServiceProxy
  ) {
    super(injector);
  }

  save(value: any) {
    this.loading = true;
    let entity = CreateRoleDto.fromJS(value);
    this.roleService.create(entity).subscribe(res => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
