import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingRolesCreateComponent } from './create.component';

describe('SettingRolesCreateComponent', () => {
  let component: SettingRolesCreateComponent;
  let fixture: ComponentFixture<SettingRolesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRolesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRolesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});