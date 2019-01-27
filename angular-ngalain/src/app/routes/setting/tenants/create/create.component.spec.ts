import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTenantsCreateComponent } from './create.component';

describe('SettingTenantsCreateComponent', () => {
  let component: SettingTenantsCreateComponent;
  let fixture: ComponentFixture<SettingTenantsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTenantsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTenantsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});