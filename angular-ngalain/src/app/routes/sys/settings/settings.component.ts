import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sys-settings',
  templateUrl: './settings.component.html',
})
export class SysSettingsComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
