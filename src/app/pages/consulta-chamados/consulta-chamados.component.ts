import { PeriodoCalendarComponent } from './../../components/periodo-calendar/periodo-calendar.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import Assunto from 'src/app/models/Assunto';
import Chamado from 'src/app/models/Chamado';
import { ChamadoService } from './../../services/chamado.service';
@Component({
  selector: 'app-consulta-chamados',
  templateUrl: './consulta-chamados.component.html',
  styleUrls: ['./consulta-chamados.component.css'],
})
export class ConsultaChamadosComponent implements OnInit {

  @ViewChild('periodo')
  periodo!: PeriodoCalendarComponent;

  dados: Chamado[] = [];
  form!: FormGroup;

  isExportEnable = false;
  exportIcon = 'pi pi-download';
  paramsParaExport: any = null;

  status = ['ABERTO', 'FECHADO'];
  responsaveis: string[] = ['José', 'João'];
  responsaveisResultado: string[] = [];
  resultsLoading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private chamadoService: ChamadoService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.buscaChamados(null);

    this.form = this.formBuilder.group({
      periodoInicial: [null],
      periodoFinal: [null],
      solicitante: [null],
      responsavel: [null],
      assuntos: [null],
      status: [null],
    });

    if (this.dados.length > 0) this.isExportEnable = true;
  }

  onSubmit() {

    this.periodo.checkValidators();

    if(this.form.invalid) return;

    const formValue = {...this.form.value}; // deep copy -
    formValue.periodoFinal = this.datePipe.transform(
      formValue.periodoFinal,
      'dd/MM/yyyy'
    );
    formValue.periodoInicial = this.datePipe.transform(
      formValue.periodoInicial,
      'dd/MM/yyyy'
    );

    console.log('Form: ', formValue);
    this.buscaChamados(formValue);
  }

  buscaChamados(filtros: any) {
    if (filtros === null) {
      filtros = {
        periodoInicial: null,
        periodoFinal: null,
        solicitante: null,
        responsavel: null,
        status: null,
      };
    }
    this.paramsParaExport = filtros;
    this.resultsLoading = true;
    this.isExportEnable = false;

    this.chamadoService
      .getAll(
        filtros.periodoInicial,
        filtros.periodoFinal,
        filtros.responsavel,
        filtros.status,
        filtros.assuntos
      )
      .pipe(
        finalize(() => {
          this.resultsLoading = false;
        })
      )
      .subscribe(
        (resp) => {
          console.log('resp: ',resp);
          this.dados = resp;
          this.isExportEnable = this.dados.length > 0;
        },
        (e) => {
          this.dados = [];
          this.isExportEnable = false;
        }
      );
  }

  buscaResponsavel(event: any) {
    const palavra = event.query;
    this.responsaveisResultado = this.responsaveis.filter(
      (p) => p.indexOf(palavra) >= 0
    );
  }

  onExport() {
    if (this.paramsParaExport === null) {
      this.paramsParaExport = {
        periodoInicial: null,
        periodoFinal: null,
        solicitante: null,
        responsavel: null,
        status: null,
      };
    }

    this.isExportEnable = false;
    this.exportIcon = 'pi pi-spin pi-spinner';

    this.chamadoService
      .export(
        this.paramsParaExport.periodoInicial,
        this.paramsParaExport.periodoFinal,
        this.paramsParaExport.responsavel,
        this.paramsParaExport.status,
        this.paramsParaExport.assuntos
      )
      .pipe(
        finalize(() => {
          this.isExportEnable = true;
          this.exportIcon = 'pi pi-download';
        })
      )
      .subscribe();
  }
}
