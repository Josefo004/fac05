import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TLogin } from 'src/app/interfaces/interfaces';
import { SideBarService } from 'src/app/shared/services/side-bar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  hayError : boolean = false;

  loginForm = this.fb.group({
    usuario: ['jose.mendoza', [Validators.required]],
    password: ['111111',[Validators.required]]
  });

  constructor(private fb: UntypedFormBuilder,
              private authService: AuthService,
              private router: Router) { }

  login(){
    this.hayError = false;
    const loginO: TLogin = {
      usuario:  this.loginForm.value.usuario,
      password: this.loginForm.value.password
    }
    console.log(loginO);

    this.authService.login(loginO)
      .subscribe(resp =>{
        this.router.navigate([`./gate`]);
      }, (error)=>{
        this.hayError=true;
        console.error(error);
      })
  }

}
