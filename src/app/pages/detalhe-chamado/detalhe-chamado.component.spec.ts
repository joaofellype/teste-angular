import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheChamadoComponent } from './detalhe-chamado.component';

describe('DetalheChamadoComponent', () => {
  let component: DetalheChamadoComponent;
  let fixture: ComponentFixture<DetalheChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheChamadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
