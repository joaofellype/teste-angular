import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuntoAutoCompleteComponent } from './assunto-auto-complete.component';

describe('AssuntoAutoCompleteComponent', () => {
  let component: AssuntoAutoCompleteComponent;
  let fixture: ComponentFixture<AssuntoAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuntoAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssuntoAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
