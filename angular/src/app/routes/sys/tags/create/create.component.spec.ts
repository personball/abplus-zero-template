import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SysTagsCreateComponent } from './create.component';

describe('SysTagsCreateComponent', () => {
  let component: SysTagsCreateComponent;
  let fixture: ComponentFixture<SysTagsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysTagsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysTagsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});