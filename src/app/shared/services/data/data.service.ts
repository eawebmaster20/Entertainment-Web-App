import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMovie } from '../../models/movie.interface';
import { Store } from '@ngrx/store';
import { updateMovie } from '../../state/board.actions';
import { Router } from '@angular/router';
import { ILocalStorageUser } from '../../models/localStorageUser';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchString:string='';
  searchPlaceholder:string='Search for movies or TV series';
  selectedCategory:string ='';
  userAuthenticated:boolean = false;
  constructor(private store:Store, private router: Router) { }

  toggleBookmarked(param:IMovie){
    if (this.userAuthenticated) {
      localStorage.setItem('tempMovie',JSON.stringify(param));
      let userBookmarkList = JSON.parse(localStorage.getItem('user') || '') as ILocalStorageUser;
      let deepCopy = JSON.parse(localStorage.getItem('tempMovie')!);
      localStorage.removeItem('tempMovie');
      deepCopy.isBookmarked= !deepCopy.isBookmarked
      this.store.dispatch(updateMovie({id:param.id, changes:deepCopy}));
      if (userBookmarkList.favoriteMovies.includes(param.id)) {
        userBookmarkList.favoriteMovies = userBookmarkList.favoriteMovies.filter(f => f !== param.id)
      } else {
        userBookmarkList.favoriteMovies=[...userBookmarkList.favoriteMovies,param.id];
      }
      localStorage.setItem('user', JSON.stringify(userBookmarkList))
      return
    }
    console.log('User not authenticated');
    this.router.navigate(['/login']);
   }
}
