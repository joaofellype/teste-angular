import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chamado from 'src/app/models/Chamado';

@Component({
  selector: 'app-cadastro-assunto',
  templateUrl: './cadastro-assunto.component.html',
  styleUrls: ['./cadastro-assunto.component.css']
})

export class CadastroAssuntoComponent implements OnInit {

  dados: Chamado[] = [];
  form!:FormGroup;

  status = ['Aberto', 'Fechado'];
  assuntos:string[] = ['Dare', 'NFe']
  responsaveis:string[] = ['José', 'João'];
  assuntosResultado:string[] = [];
  responsaveisResultado:string[] = [];

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      periodoInicial: ['', [Validators.required]],
      periodoFinal: ['', [Validators.required]],
      solicitante: ['', [Validators.required]],
      responsavel: ['', [Validators.required]],
      assuntos: [[], [Validators.required]],
      status: ['', [Validators.required]],
    })

    this.dados = [
      { idChamado: 1, solicitante: 'José', responsavel: 'João', assuntos: [], status: 'Aberto', descricao:'', causaRaiz: '', solucaoProposta: '' },
      { idChamado: 2, solicitante: 'José', responsavel: 'João', assuntos: [], status: 'Aberto', descricao:'', causaRaiz: '', solucaoProposta: '' },
      { idChamado: 3, solicitante: 'José', responsavel: 'João', assuntos: [], status: 'Aberto', descricao:'', causaRaiz: '', solucaoProposta: '' },
    ];
  }

  onSubmit(){
    const formValue = this.form.value;
    console.log(formValue);

  }

  buscaAssunto(event: any){
    const palavra = event.query;
    this.assuntosResultado = this.assuntos.filter(p => p.indexOf(palavra) >= 0);
  }

  buscaResponsavel(event: any){
    const palavra = event.query;
    this.responsaveisResultado = this.responsaveis.filter(p => p.indexOf(palavra) >= 0);
  }
}

