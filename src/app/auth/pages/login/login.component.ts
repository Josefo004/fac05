import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  hayError : boolean = false;

  loginForm = this.fb.group({
    email: ['juan.carrasco', [Validators.required]],
    password: ['111111',[Validators.required]],
    sucursal: [0,[Validators.required]],
    remember:[false]
  });


  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    this.hayError = false;
    const usulogin  = {
      usuario : this.loginForm.value.email,
      passwd : this.loginForm.value.password,
      sucursal : this.loginForm.value.sucursal
    };
    console.log(usulogin);
  }

}
