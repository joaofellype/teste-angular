import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingChamadosComponent } from './ranking-chamados.component';

describe('RankingChamadosComponent', () => {
  let component: RankingChamadosComponent;
  let fixture: ComponentFixture<RankingChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingChamadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
