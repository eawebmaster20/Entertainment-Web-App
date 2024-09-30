import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { ILogHttpLoginRes } from '../../shared/models/http.interface';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { JsonPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormsModule, RouterLink, ToastModule, JsonPipe,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  userCredentials = {
    email: '',
    password: ''
  }
  loading:boolean = false;
  constructor(
    private router:Router,
    private apiService: ApiService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) {  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  login(){
    this.loading = true;
    console.log(this.userCredentials);
    this.apiService.login(this.userCredentials)
      .subscribe({
        next: (user:ILogHttpLoginRes) => {
          console.log(user);
          this.loading=false;
          if (user && user.token) {
            this.createUser(this.userCredentials.email, user.token)
            this.show('Logged in successfully', 'contrast');
            console.log('Logged in successfully', user);
          }
        },
        error: (error) => {
          this.loading=false;
          console.error('Error logging in', error);
        }
      })
  }
  createUser(userEmail:string, token:string){
    try {
      localStorage.setItem('user', JSON.stringify({email: userEmail, authToken:token, favoriteMovies:[]}))
      this.navigateTo('')
    } catch (error) {
      throw error
    }
  }
  show(msg:string, type:string) {
    this.messageService.add({ severity: type, summary: 'Success', detail: msg });
}
  navigateTo(url:string ){
    this.router.navigate([`${url}`])
  }
}
