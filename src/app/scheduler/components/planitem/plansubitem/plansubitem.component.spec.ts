import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansubitemComponent } from './plansubitem.component';

describe('PlansubitemComponent', () => {
  let component: PlansubitemComponent;
  let fixture: ComponentFixture<PlansubitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansubitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansubitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
