import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingRolesEditComponent } from './edit.component';

describe('SettingRolesEditComponent', () => {
  let component: SettingRolesEditComponent;
  let fixture: ComponentFixture<SettingRolesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRolesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRolesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});