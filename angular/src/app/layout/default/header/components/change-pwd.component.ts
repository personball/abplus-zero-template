import { Component } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFUISchema } from '@delon/form';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { AccountServiceProxy, ChangePasswordInput } from '@shared/service-proxies/service-proxies';
import { PasswordValidatorService } from '@core/password-validator/password-validator.service';

@Component({
    selector: 'header-change-pwd',
    template: `
    <div class="modal-header">
        <div class="modal-title">修改密码</div>
    </div>
    <sf  #sf mode="edit" [schema]="schema" [ui]="ui" button="none">
        <div class="modal-footer">
        <button nz-button type="button" (click)="close()">关闭</button>
        <button nz-button type="submit" nzType="primary" (click)="save(sf.value)" [disabled]="!sf.valid">保存</button>
        </div>
    </sf>
    `,
})
export class HeaderChangePwdComponent {
    schema: SFSchema = {
        properties: {
            currentPwd: { type: 'string', title: '原密码', ui: { type: 'password' } },
            password: {
                type: 'string',
                title: '新密码',
                ui: {
                    type: 'password',
                    validator: (v: any, formProperty: FormProperty, form: PropertyGroup) => {
                        return this.passwordValidator.validate(v);
                    }
                }
            },
            confirm: {
                type: 'string',
                title: '再输一遍',
                ui: {
                    type: 'password',
                    validator: (v: any, formProperty: FormProperty, form: PropertyGroup) => {
                        return (form.value) && (v === form.value.password) ? [] : [{ keyword: 'required', message: '两次输入不一致!' }];
                    }
                }
            }
        },
        required: ['currentPwd', 'password', 'confirm']
    };
    ui: SFUISchema = {
        '*': {
            spanLabelFixed: 100,
            grid: { offset: 6, span: 12 },
        },
    };

    constructor(
        private passwordValidator: PasswordValidatorService,
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        private accountService: AccountServiceProxy
    ) {
        this.passwordValidator.init();
    }

    save(value: any) {
        let input = new ChangePasswordInput();
        input.currentPassword = value.currentPwd;
        input.newPassword = value.password;
        this.accountService.changePassword(input).subscribe(() => {
            this.msgSrv.success('保存成功');
            this.modal.close(true); // this.modal.close(value); 可以传值给list组件
        });
    }
    close() {
        this.modal.destroy();
    }

}
