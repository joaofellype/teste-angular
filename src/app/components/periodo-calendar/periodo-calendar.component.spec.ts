import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoCalendarComponent } from './periodo-calendar.component';

describe('PeriodoCalendarComponent', () => {
  let component: PeriodoCalendarComponent;
  let fixture: ComponentFixture<PeriodoCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
