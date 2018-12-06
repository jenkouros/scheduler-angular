import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeletePopupComponent } from './plan-delete-popup.component';

describe('PlanDeletePopupComponent', () => {
  let component: PlanDeletePopupComponent;
  let fixture: ComponentFixture<PlanDeletePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDeletePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
