import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../../models/movie.interface';
import { IUser } from '../../models/user.interface';
import { ILogHttpLoginRes } from '../../models/http.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://entertainment-web-app-backend-2.onrender.com/api'
  constructor(private http:HttpClient) { }
  register(user:IUser){
    return this.http.post<{message:string}>(`${this.baseUrl}/register`, user)
  }

  login(user:IUser){
    return this.http.post<ILogHttpLoginRes>(`${this.baseUrl}/login`, user)
  }
  getMovies():Observable<IMovie[]>{
    return this.http.get<IMovie[]>(`${this.baseUrl}/movies`);
  }
}
