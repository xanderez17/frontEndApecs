import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading= true;
  fake=false;
  listausuario:Array<Usuario>=[]
  cont: number=0;
  hide = true;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router:Router,
              private serviceUser:UsuarioService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }


  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    this.serviceUser.listar().subscribe((x:any)=>{
      this.listausuario=x;
      for (let us of this.listausuario){
        if (us.username==usuario&&us.password==password){
          this.cont=1;
        }
      }
      if (this.cont==1){
        this.fakeLoading()
      }else{
        this._snackBar.open('Usuario o Contraseña Incorrectos!', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

  fakeLoading(){
    this.fake=true;
    this.loading=false;
    setTimeout(()=>{
      //Redireccionar al Dashboard
      this.router.navigateByUrl('/dashboard').then((m)=>{
        console.log("Dashbaord")
        this.fake=false;
      })
    }, 2000);
  }


}
