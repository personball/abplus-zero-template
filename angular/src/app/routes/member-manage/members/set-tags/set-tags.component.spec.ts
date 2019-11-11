import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberManageMembersSetTagsComponent } from './set-tags.component';

describe('MemberManageMembersSetTagsComponent', () => {
  let component: MemberManageMembersSetTagsComponent;
  let fixture: ComponentFixture<MemberManageMembersSetTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberManageMembersSetTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberManageMembersSetTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});