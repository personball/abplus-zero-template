import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema, FormProperty, PropertyGroup } from '@delon/form';
import { RoleServiceProxy, CreateRoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-roles-create',
  templateUrl: './create.component.html',
})
export class SysRolesCreateComponent extends AppComponentBase {
  record: any = {};
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '角色名', maxLength: 32 },
      displayName: { type: 'string',  title: '展示名', maxLength: 64 },
      description: { type: 'string', title: '描述', maxLength: 5000 },
      isDefault: { type: 'boolean', title: '默认角色' },
      permissions: {
        type: 'string',
        title: '权限',
        ui: {
          widget: 'checkbox',
          checkAll: true,
          asyncData: () => this.roleService.getAllPermissions().pipe(map(r => r.items.map(i => ({ label: i.displayName, value: i.name })))),
          default: []
        }
      }
    },
    required: ['name', 'displayName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    }
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
