import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ContentComponent } from '../../components/content/content.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MovieListingsComponent } from '../../components/movie-listings/movie-listings.component';
import { ILocalStorageUser } from '../../shared/models/localStorageUser';
import { Store } from '@ngrx/store';
import { updateMovie } from '../../shared/state/board.actions';
import { DataService } from '../../shared/services/data/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ContentComponent, SearchBarComponent, MovieListingsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private store:Store, private dataService:DataService){}
  ngOnInit(): void {

  }
}
