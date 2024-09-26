import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { IUser } from '../../shared/models/user.interface';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule,MatIconModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userCredentials:IUser = {
    username: '',
    password: ''
  }
  constructor(private apiService:ApiService, private router:Router){}
  register() {
    console.log('register');
    this.apiService.register(this.userCredentials).subscribe({
      next: (data) => this.router.navigate(['/login']),
      error: (error) => console.error(error)
    })
  }
}
