import { AppToastService } from './../../core/app-toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastService: AppToastService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
    });
  }

  onSubmit(){
    let formValue = this.form.value;
    this.authService.login(formValue.userName, formValue.userPassword);
    this.toastService.createMessage('Login', 'Logado com sucesso!', 'success');
    // TODO: correct redirect
    if(this.authService.isUserLoggedIn()) this.router.navigate(['/']);
  }

}
