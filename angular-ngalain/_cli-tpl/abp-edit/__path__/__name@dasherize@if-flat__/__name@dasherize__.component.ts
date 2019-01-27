import { Component, OnInit,Injector, ViewChild<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';<% if(!modal) { %>
  import { ActivatedRoute } from '@angular/router';
  import { Location } from '@angular/common';<% } %>
  import { <% if(modal) { %>NzModalRef, <% } %>NzMessageService } from 'ng-zorro-antd';
  import { SFSchema, SFUISchema } from '@delon/form';
  import { AppComponentBase } from '@shared/component-base/app-component-base';
  import { EntityNameServiceProxy, EntityNameDto } from '@shared/service-proxies/service-proxies';
  import { map } from 'rxjs/operators';
  
  @Component({
    selector: '<%= selector %>',
    templateUrl: './<%= dasherize(name) %>.component.html',<% if(!inlineStyle) { %><% } else { %>
      styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
    encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
    changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
  })
  export class <%= componentName %> extends AppComponentBase implements OnInit {
    <% if(modal) { %>record: any = {};<% } else { %>
    id = this.route.snapshot.params.id;<% } %>
    i: any;
    loading: boolean = false;
    schema: SFSchema = {
      properties: {
        userName: { type: 'string', title: '用户名', maxLength: 256 },
        emailAddress: { type: 'string', title: '邮箱地址', maxLength: 256 }, // TODO 加上format: 'email',影响init显示
        surname: { type: 'string', title: '姓', maxLength: 64 },
        name: { type: 'string', title: '名字', maxLength: 64 },
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
      required: ['userName', 'name', 'surname', 'emailAddress']
    };
    ui: SFUISchema = {
      '*': {
        spanLabelFixed: 100,
        grid: { span: 12 },
      }
    };
  
    constructor(<% if(modal) { %>
      private modal: NzModalRef,<% } else { %>
      private route: ActivatedRoute,
      public location: Location,<% } %>
      private injector: Injector,
      private msgSrv: NzMessageService,
      private entityNameService: EntityNameServiceProxy
    ) {
      super(injector);
    }
  
    ngOnInit(): void {
      <% if(modal) { %>if (this.record.id > 0)<% } else { %>if (this.id > 0)<% } %>{
        this.loading = true;
        this.<%= name %>Service.get(this.record.id).subscribe(res => {
          this.loading = false;
          this.i = res;
        });
      }
    }
  
    save(value: any) {
      this.loading = true;
      let entity = EntityNameDto.fromJS(value);
      this.entityNameService.update(entity).subscribe(() => {
        this.loading = false;
        this.msgSrv.success('保存成功');
        this.modal.close(true); // this.modal.close(value); 可以传值给list组件
      });
    }<% if(modal) { %>
  
    close() {
      this.modal.destroy();
    }<% } %>
  }