import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSettingsBaseComponent } from './base.component';

describe('AccountSettingsBaseComponent', () => {
  let component: AccountSettingsBaseComponent;
  let fixture: ComponentFixture<AccountSettingsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
