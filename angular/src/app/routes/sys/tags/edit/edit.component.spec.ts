import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SysTagsEditComponent } from './edit.component';

describe('SysTagsEditComponent', () => {
  let component: SysTagsEditComponent;
  let fixture: ComponentFixture<SysTagsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysTagsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysTagsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});