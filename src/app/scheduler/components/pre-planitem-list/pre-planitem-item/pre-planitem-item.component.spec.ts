import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePlanitemItemComponent } from './pre-planitem-item.component';

describe('PrePlanitemItemComponent', () => {
  let component: PrePlanitemItemComponent;
  let fixture: ComponentFixture<PrePlanitemItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrePlanitemItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePlanitemItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
