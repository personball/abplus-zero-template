import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingRolesComponent } from './roles.component';

describe('SettingRolesComponent', () => {
  let component: SettingRolesComponent;
  let fixture: ComponentFixture<SettingRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
