import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ContentComponent } from '../../components/content/content.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MovieListingsComponent } from '../../components/movie-listings/movie-listings.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ContentComponent, SearchBarComponent, MovieListingsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
