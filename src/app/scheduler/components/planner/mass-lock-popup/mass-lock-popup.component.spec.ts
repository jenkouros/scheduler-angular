import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassLockPopupComponent } from './mass-lock-popup.component';

describe('MassLockPopupComponent', () => {
  let component: MassLockPopupComponent;
  let fixture: ComponentFixture<MassLockPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassLockPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassLockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
