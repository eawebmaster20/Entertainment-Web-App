import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { IndexdbService } from '../../shared/services/indexDb/indexdb.service';
import { ApiService } from '../../shared/services/api/api.service';
import { ILogHttpLoginRes } from '../../shared/models/http.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  apiUrl = 'http://localhost:5000/api';
  userCredentials = {
    username: '',
    password: ''
  }
  constructor(
    private index: IndexdbService, 
    private router:Router,
    private apiService: ApiService
  ) {}
  login(){
    console.log(this.userCredentials);
    this.apiService.login(this.userCredentials)
      .subscribe({
        next: (user:ILogHttpLoginRes) => {
          if (user && user.token) {
            localStorage.setItem('jwtToken', JSON.stringify(user));
            this.router.navigate(['/movies'])
          }
          console.log('Logged in successfully', user);
        },
        error: (error) => {
          console.error('Error logging in', error);
        }
      })
  }
  testDb(){
    this.index.createIndexDbDatabase()
  }

  getMovies(){
    this.apiService.getMovies()
     .pipe(map(movies => movies))
     .subscribe({
        next: (movies) => {
          console.log('Movies:', movies);
        },
        error: (error) => {
          console.error('Error getting movies', error);
        }
      })
  }
}
