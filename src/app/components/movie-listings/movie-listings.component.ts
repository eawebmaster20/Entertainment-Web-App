import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Store } from '@ngrx/store';
import { DataService } from '../../shared/services/data/data.service';
import { selectAllMovies } from '../../shared/state/board.selectors';
import { AsyncPipe } from '@angular/common';
import { ILocalStorageUser } from '../../shared/models/localStorageUser';
import { Router } from '@angular/router';
import { fetchMovies } from '../../shared/state/board.actions';

@Component({
  selector: 'app-movie-listings',
  standalone: true,
  imports: [SearchBarComponent, AsyncPipe],
  templateUrl: './movie-listings.component.html',
  styleUrl: './movie-listings.component.scss'
})
export class MovieListingsComponent implements OnInit {
  
  selectAll = selectAllMovies
 constructor(public store:Store, public dataService:DataService, private router:Router){}

 
 ngOnInit(): void { 
  let persistantUser = localStorage.getItem('user')
  if(persistantUser){
    let parsedUser = JSON.parse(persistantUser) as ILocalStorageUser
    parsedUser.authToken.length 
    ? this.dataService.userAuthenticated = true
    : this.dataService.userAuthenticated = false
  }
  }
}
