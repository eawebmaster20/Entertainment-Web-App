import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Store } from '@ngrx/store';
import { DataService } from '../../shared/services/data/data.service';
import { selectAllMovies } from '../../shared/state/board.selectors';
import { AsyncPipe } from '@angular/common';
import { IMovie } from '../../shared/models/movie.interface';
import { take } from 'rxjs';
import { updateMovie } from '../../shared/state/board.actions';

@Component({
  selector: 'app-movie-listings',
  standalone: true,
  imports: [SearchBarComponent, AsyncPipe],
  templateUrl: './movie-listings.component.html',
  styleUrl: './movie-listings.component.scss'
})
export class MovieListingsComponent implements OnInit {
  
  selectAll = selectAllMovies
 constructor(public store:Store, public dataService:DataService){}

 
 ngOnInit(): void {  }
}
