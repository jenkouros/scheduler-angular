import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePlanitemListComponent } from './pre-planitem-list.component';

describe('PrePlanitemListComponent', () => {
  let component: PrePlanitemListComponent;
  let fixture: ComponentFixture<PrePlanitemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrePlanitemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePlanitemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
