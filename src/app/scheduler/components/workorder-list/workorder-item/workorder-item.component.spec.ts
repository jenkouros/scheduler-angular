import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderItemComponent } from './workorder-item.component';

describe('WorkorderItemComponent', () => {
  let component: WorkorderItemComponent;
  let fixture: ComponentFixture<WorkorderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
