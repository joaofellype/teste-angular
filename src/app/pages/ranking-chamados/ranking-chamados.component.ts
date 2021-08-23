import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
//import { CalendarModule } from 'primeng/calendar';
//import { SelectItem } from 'primeng/api';
//import { SelectItemGroup } from 'primeng/api';
import { RankingService } from '../../services/ranking.service';
import RankinModel from '../../models/Ranking';
import TipoRanking from '../../models/TipoRanking';


interface Status {
  tipo: string;
  codigo: number;
}
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking-chamados.component.html',
  styleUrls: ['./ranking-chamados.component.css']
})
export class RankingChamadosComponent implements OnInit {
  solicitantes: TipoRanking[];
  seletecdSolicitante: RankinModel | undefined;
  status: Status[];
  selectedStatus!: Status;
  solicitantesTable!: RankinModel[];
  exportIcon = 'pi pi-download';

  constructor(
    private solicitanteService: RankingService,
  ) {
    this.solicitantes = [
      { tipo: 'Solicitante', codigo: 1 },
      { tipo: 'Responsável', codigo: 2 },
      { tipo: 'Assunto', codigo: 2 },
      { tipo: 'Mês', codigo: 3 },
      { tipo: 'Semana', codigo: 4 },
      { tipo: 'Grupo', codigo: 5 },
      { tipo: 'Área', codigo: 6 }
    ];
    this.status = [
      { tipo: 'Aberto', codigo: 1 },
      { tipo: 'Fechado', codigo: 2 }
    ];
  }
  //this.solicitantesTable = dados;

  ngOnInit() {
    this.solicitanteService.getAll().subscribe(res=>{
      this.solicitantesTable = res;
    })
  }
}
