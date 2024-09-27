import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { ILogHttpLoginRes } from '../../shared/models/http.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormsModule, RouterLink, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  userCredentials = {
    email: '',
    password: ''
  }
  constructor(
    private router:Router,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}
  login(){
    console.log(this.userCredentials);
    this.apiService.login(this.userCredentials)
      .subscribe({
        next: (user:ILogHttpLoginRes) => {
          console.log(user);
          if (user && user.token) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logged in' });
            this.createUser(this.userCredentials.email, user.token)
            console.log('Logged in successfully', user);
          }
        },
        error: (error) => {
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

  navigateTo(url:string ){
    this.router.navigate([`${url}`])
  }
  // getMovies(){
  //   this.apiService.getMovies()
  //    .pipe(map(movies => movies))
  //    .subscribe({
  //       next: (movies) => {
  //         console.log('Movies:', movies);
  //       },
  //       error: (error) => {
  //         console.error('Error getting movies', error);
  //       }
  //     })
  // }
}
