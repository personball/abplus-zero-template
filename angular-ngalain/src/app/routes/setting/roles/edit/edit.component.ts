import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema, SFComponent, SFUISchemaItem } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { RoleServiceProxy, RoleDto } from '@shared/service-proxies/service-proxies';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-setting-roles-edit',
  templateUrl: './edit.component.html',
})
export class SettingRolesEditComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '角色名', maxLength: 32 },
      displayName: { type: 'string', title: '展示名', maxLength: 64 },
      description: { type: 'string', title: '描述', maxLength: 5000, ui: { grid: { span: 24 } } },
      isDefault: { type: 'boolean', title: '默认角色', ui: { grid: { span: 24 } } },
      isStatic: { type: 'boolean', ui: { hidden: true } },
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

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.loading = true;
      this.roleService.getRoleForEdit(this.record.id).subscribe(res => {
        this.loading = false;
        this.i = res.role;
        this.i.permissions = res.grantedPermissionNames;
        if (res.role.isStatic) {
          this.schema.properties.name.readOnly = true;
          this.schema.properties.name.ui = <SFUISchemaItem>{ optionalHelp: '内置角色不可修改角色名' };
        }
      });
    }
  }

  save(value: any) {
    this.loading = true;
    let entity = RoleDto.fromJS(value);
    this.roleService.update(entity).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
