import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input,  OnInit } from '@angular/core';


@Component({
  selector: 'app-periodo-calendar',
  templateUrl: './periodo-calendar.component.html',
  styleUrls: ['./periodo-calendar.component.css'],
})
export class PeriodoCalendarComponent implements OnInit {
  @Input()
  form!: FormGroup;

  @Input()
  controlNameInicial!: string;

  @Input()
  controlNameFinal!: string;

  controlInicial!: FormControl;
  controlFinal!: FormControl;

  isValido = true;
  erroMessage: string = '';
  invalidCss: string = '';

  constructor() {}

  ngOnInit(): void {
    this.controlInicial = this.form.get(this.controlNameInicial) as FormControl;
    this.controlFinal = this.form.get(this.controlNameFinal) as FormControl;
  }

  public checkValidators() {
    const valueI = this.controlInicial.value;
    const valueF = this.controlFinal.value;

    if (valueI || valueF) {
      if (valueI && !valueF) {
        this.erroMessage = 'Informe o período final!';
      } else if (!valueI && valueF) {
        this.erroMessage = 'Informe o período inicial!';
      } else if ((valueI as Date) > (valueF as Date)) {
        this.erroMessage =
          'Periodo inicial não pode ser maior que o periodo final!';
      } else {
        this.invalidCss = '';
        this.erroMessage = '';
        this.isValido = false;
        this.form.setErrors(null);
        return;
      }
      this.form.setErrors({invalido: true});
      this.invalidCss = 'ng-invalid ng-dirty';
      this.isValido = true;
      return;
    }

    this.invalidCss = '';
    this.erroMessage = '';
    this.form.setErrors(null);
    this.isValido = false;
  }
}
