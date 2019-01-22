import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TitleService } from '@delon/theme';
import { VERSION as VERSION_ALAIN } from '@delon/theme';
import { VERSION as VERSION_ZORRO, NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';

import { preloaderFinished } from '@delon/theme';
import { MessageExtension } from './message.extension';
preloaderFinished();


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(

    private _messageService: NzMessageService,
    private _notifyService: NzNotificationService,
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ng-alain-version',
      VERSION_ALAIN.full,
    );
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full,
    );
  }

  ngOnInit() {

    // 覆盖abp自带的通知和mssage
    // MessageExtension.overrideAbpMessageByMini(
    //   this._messageService,
    //   this._modalService,
    // );
    MessageExtension.overrideAbpMessageByNgModal(this.modalSrv);
    MessageExtension.overrideAbpNotify(this._notifyService);

    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      });
  }
}
