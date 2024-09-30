import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMovie } from '../../models/movie.interface';
import { Store } from '@ngrx/store';
import { updateMovie } from '../../state/board.actions';
import { Router } from '@angular/router';
import { ILocalStorageUser } from '../../models/localStorageUser';
import { NotificationService } from '../notification/notification.service';
import { LocalstorageService } from '../localStorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  searchString:string='';
  searchPlaceholder:string='Search for movies or TV series';
  selectedCategory:string ='';
  userAuthenticated:boolean = false;
  isLoading:boolean = false;
  constructor(
    private store:Store, 
    private router: Router,
    private notificationService: NotificationService,
    private localStorage: LocalstorageService
  ) { }

  toggleBookmarked(param:IMovie){
    if (this.userAuthenticated) {
      this.notificationService.showSuccess('Title', 'This is a success message');
      // localStorage.setItem('tempMovie',JSON.stringify(param));
      this.localStorage.setItem('tempMovie',param)
      // let userBookmarkList = JSON.parse(localStorage.getItem('user') || '') as ILocalStorageUser;
      let userBookmarkList = this.localStorage.getItem('user')
      // let deepCopy = JSON.parse(localStorage.getItem('tempMovie')!);
      let deepCopy = this.localStorage.getItem('tempMovie')
      // localStorage.removeItem('tempMovie');
      this.localStorage.removeItem('tempMovie');
      deepCopy.isBookmarked= !deepCopy.isBookmarked
      this.store.dispatch(updateMovie({id:param.id, changes:deepCopy}));
      if (userBookmarkList.favoriteMovies.includes(param.id)) {
        userBookmarkList.favoriteMovies = userBookmarkList.favoriteMovies.filter((f:string) => f !== param.id)
      } else {
        userBookmarkList.favoriteMovies=[...userBookmarkList.favoriteMovies,param.id];
      }
      // localStorage.setItem('user', JSON.stringify(userBookmarkList))
      this.localStorage.setItem('user', userBookmarkList);
      return
    }
    console.log('User not authenticated');
    this.router.navigate(['/login']);
   }
}
