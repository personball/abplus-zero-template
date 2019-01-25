import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-account-setting',
  templateUrl: './setting.component.html',
})
export class AccountSettingComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
