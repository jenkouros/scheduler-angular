import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLengthComponent } from './page-length.component';

describe('PageLengthComponent', () => {
  let component: PageLengthComponent;
  let fixture: ComponentFixture<PageLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
