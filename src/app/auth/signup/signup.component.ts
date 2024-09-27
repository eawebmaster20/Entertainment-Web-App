import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { IUser } from '../../shared/models/user.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule,MatIconModule, FormsModule, RouterLink,ToastModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [MessageService]
})
export class SignupComponent {
  userCredentials:IUser = {
    email: '',
    password: ''
  }
  constructor(private apiService:ApiService, private router:Router,private messageService: MessageService){}
  register() {
    console.log('register');
    this.apiService.register(this.userCredentials).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured'+error.message });
        console.error(error)}
    })
  }
}
