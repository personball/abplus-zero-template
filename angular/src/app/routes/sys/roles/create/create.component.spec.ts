import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SysRolesCreateComponent } from './create.component';

describe('SysRolesCreateComponent', () => {
  let component: SysRolesCreateComponent;
  let fixture: ComponentFixture<SysRolesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysRolesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysRolesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});