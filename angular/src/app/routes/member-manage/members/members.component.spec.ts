import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberManageMembersComponent } from './members.component';

describe('MemberManageMembersComponent', () => {
  let component: MemberManageMembersComponent;
  let fixture: ComponentFixture<MemberManageMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberManageMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberManageMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
