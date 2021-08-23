import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChamadoService } from '../../services/chamado.service';
import Chamado from '../../models/Chamado';
import { Message } from 'primeng/api';
import Assunto from './../../models/Assunto';

@Component({
  selector: 'app-detalhe-chamado',
  templateUrl: './detalhe-chamado.component.html',
  styleUrls: ['./detalhe-chamado.component.css'],
})
export class DetalheChamadoComponent implements OnInit {
  displayModal: boolean = false;
  displayMsg: boolean = false;
  resultsLoading: boolean = true;
  saveButtonLoading: boolean = false;

  chamadoDetalhe: Chamado = new Chamado();
  chamadosSemelhantes: Chamado[] = [];

  msgs: Message[] = [];

  form!: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private chamadoService: ChamadoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      assuntos: [[]],
    });

    this.activeRoute.paramMap.subscribe((params) => {
      this.resultsLoading = true;
      this.chamadoDetalhe = new Chamado();
      this.chamadosSemelhantes = [];

      const idChamado = params.get('id') as string;

      this.chamadoService.getDetalhe(idChamado).subscribe((resp) => {
        this.chamadoDetalhe = resp;
      });

      this.chamadoService.getRelacionados(idChamado).subscribe((resp) => {
        this.chamadosSemelhantes = resp;
        this.resultsLoading = false;
      });
    });
  }

  voltarPagina() {
    this.location.back();
  }

  showAssuntosModalDialog() {
    this.form.get('assuntos')?.setValue(this.chamadoDetalhe.assuntos);
    this.displayModal = true;
  }

  verificarAssuntoVazio(assuntos: Assunto[]) {
    if (assuntos.length === 0) {
      if (this.msgs.length === 0) {
        this.msgs = [];
        this.msgs.push({
          severity: 'warn',
          summary: 'Campo vazio!',
          detail: 'É necessário selecionar ao menos um assunto.',
        });
      }
      this.saveButtonLoading = false;
      return true;
    }
    return false;
  }

  salvarAssuntos() {
    this.saveButtonLoading = true;
    let assuntos = this.form.value.assuntos as Assunto[];
    if (this.verificarAssuntoVazio(assuntos)) return;
    this.chamadoService
      .editarAssuntos(this.chamadoDetalhe.idChamado, assuntos)
      .subscribe(
        (resp) => {
          this.chamadoDetalhe.assuntos = assuntos;
          this.displayModal = false;
          this.saveButtonLoading = false;
        },
        (err) => {
          this.saveButtonLoading = false;
        }
      );
  }
}
