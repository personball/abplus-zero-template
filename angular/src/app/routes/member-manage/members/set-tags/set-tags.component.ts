import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { MemberUserServiceProxy, MemberTagsDto, TagServiceProxy, TagType } from '@shared/service-proxies/service-proxies';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member-manage-members-set-tags',
  templateUrl: './set-tags.component.html',
})
export class MemberManageMembersSetTagsComponent extends AppComponentBase implements OnInit {
  record: any = {};
  i: any;
  loading: boolean = false;

  schema: SFSchema = {
    'properties': {
      'tagIds': {
        'title': '标签',
        'type': 'number',
        default: [],
        ui: {
          asyncData: () => this.tagServiceProxy.getAll(TagType.MemberUser, 0, 1000)
            .pipe(map(r => r.items.map(i => ({ label: i.name, value: i.id })))),
          widget: 'tag'
        },
      }
    }
  };

  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
      order: ['tagIds']
    }
  };

  constructor(
    private modal: NzModalRef,
    private injector: Injector,
    private msgSrv: NzMessageService,
    private tagServiceProxy: TagServiceProxy,
    private memberUserService: MemberUserServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.loading = true;
      this.memberUserService.getTags(this.record.id).subscribe(res => {
        this.loading = false;
        this.i = res;
      });
    }
  }

  save(value: any) {
    if (!value) {
      this.modal.close(true);
      return;
    }
    this.loading = true;
    let memberTagsDto = MemberTagsDto.fromJS(value);
    this.memberUserService.setTags(memberTagsDto).subscribe(() => {
      this.loading = false;
      this.msgSrv.success('保存成功');
      this.modal.close(true); // this.modal.close(value); 可以传值给list组件
    });
  }

  close() {
    this.modal.destroy();
  }
}
