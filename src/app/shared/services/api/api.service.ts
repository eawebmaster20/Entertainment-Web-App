import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../../models/movie.interface';
import { IUser } from '../../models/user.interface';
import { environment } from '../../../../environments/environment.development';
import { ILogHttpLoginRes } from '../../models/http.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  register(user:IUser){
    return this.http.post(environment.BASE_URL, user)
  }

  login(user:IUser){
    return this.http.post<ILogHttpLoginRes>(`${environment.BASE_URL}/login`, user)
  }
  getMovies():Observable<IMovie[]>{
    return this.http.get<IMovie[]>('assets/data.json');
  }
}
