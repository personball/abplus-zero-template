import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SysTagsComponent } from './tags.component';

describe('SysTagsComponent', () => {
  let component: SysTagsComponent;
  let fixture: ComponentFixture<SysTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
