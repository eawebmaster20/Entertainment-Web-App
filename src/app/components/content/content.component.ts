import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../shared/state/board.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data/data.service';
import { FormsModule } from '@angular/forms';
import { ILocalStorageUser } from '../../shared/models/localStorageUser';
import { fetchMovies, updateMovie } from '../../shared/state/board.actions';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FilterPipe, AsyncPipe, FormsModule, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {
  bookmarked:boolean = false;
  selectAll = selectAllMovies
  constructor(public store:Store, public dataService:DataService){}
  isBookmarked():boolean{
    return this.bookmarked;
  }

  ngOnInit(): void {
   this.store.dispatch(fetchMovies());
    // if(localStorage.getItem('user')){
    //   let user = JSON.parse(localStorage.getItem('user')!) as ILocalStorageUser;
    //   if (user.authToken.length) {
    //     this.dataService.userAuthenticated = true;
    //     user.favoriteMovies.forEach(id => {
    //       console.log(id)
    //       this.store.dispatch(updateMovie({id:id, changes:{isBookmarked:true}}))
    //     });
    //   }
    // }
  }
}
