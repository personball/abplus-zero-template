import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sys-audit-logs-detail',
  templateUrl: './detail.component.html',
})
export class SysAuditLogsDetailComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService
  ) { }

  ngOnInit(): void {
    this.i = this.record;
  }

  close() {
    this.modal.destroy();
  }
}
