import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingTenantsEditComponent } from './edit.component';

describe('SettingTenantsEditComponent', () => {
  let component: SettingTenantsEditComponent;
  let fixture: ComponentFixture<SettingTenantsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTenantsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTenantsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});