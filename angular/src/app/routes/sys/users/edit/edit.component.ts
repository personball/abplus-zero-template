import { Component, OnInit, Injector } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-users-edit',
  templateUrl: './edit.component.html',
})
export class SysUsersEditComponent extends AppComponentBase implements OnInit {
  record: any = {}; // 接收入参
  i: any; // 绑定表单
  loading: boolean = false;
  schema: SFSchema = {
    properties: {
      userName: { type: 'string', title: '用户名', maxLength: 256 },
      emailAddress: { type: 'string', title: '邮箱地址', maxLength: 256 }, // TODO 加上format: 'email',影响init显示
      surname: { type: 'string', title: '姓', maxLength: 64 },
      name: { type: 'string', title: '名字', maxLength: 64 },
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
    required: ['userName', 'name', 'surname', 'emailAddress']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    }
  };

  constructor(
    private injector: Injector,
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private userService: UserServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.loading = true;
      this.userService.get(this.record.id).subscribe(res => {
        this.loading = false;
        this.i = res;
      });
    }
  }

  save(value: any) {
    this.loading = true;
    let user = UserDto.fromJS(value);
    this.userService.update(user).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
