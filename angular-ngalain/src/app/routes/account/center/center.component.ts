import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-account-center',
  templateUrl: './center.component.html',
})
export class AccountCenterComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
