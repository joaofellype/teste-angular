import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { AssuntoService } from 'src/app/services/assunto.service';
import Assunto from 'src/app/models/Assunto';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-assunto-auto-complete',
  templateUrl: './assunto-auto-complete.component.html',
  styleUrls: ['./assunto-auto-complete.component.css'],
})
export class AssuntoAutoCompleteComponent implements OnInit {
  @Input()
  multiple: boolean = false;

  @Input()
  form!: FormGroup;

  @Input()
  controlName!: string;

  control!: FormControl;

  assuntos: Assunto[] = [];
  assuntosResultado: Assunto[] = [];

  constructor(private assuntoService: AssuntoService) {}

  ngOnInit(): void {
    this.control = this.form.get(this.controlName) as FormControl;

    this.assuntoService
      .getAll()
      .subscribe((assuntos) => {
        this.assuntos = assuntos;
      });
  }

  buscaAssunto(event: any) {
    let palavra: string = (event.query as string).toUpperCase();
    this.assuntosResultado = this.assuntos.filter(
      (p) => p.tag.indexOf(palavra) >= 0
    );
  }
}
