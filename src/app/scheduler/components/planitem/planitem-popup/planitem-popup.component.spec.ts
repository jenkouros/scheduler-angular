import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanitemPopupComponent } from './planitem-popup.component';

describe('PlanitemPopupComponent', () => {
  let component: PlanitemPopupComponent;
  let fixture: ComponentFixture<PlanitemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanitemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanitemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
