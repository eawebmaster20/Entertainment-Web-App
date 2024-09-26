import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMovie } from '../../models/movie.interface';
import { Store } from '@ngrx/store';
import { updateMovie } from '../../state/board.actions';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchString:string='';
  selectedCategory:string ='';
  constructor(private store:Store) { }

  toggleBookmarked(param:IMovie){
    localStorage.setItem('tempMovie',JSON.stringify(param));
    let deepCopy = JSON.parse(localStorage.getItem('tempMovie')!);
    localStorage.removeItem('tempMovie');
    deepCopy.isBookmarked= !deepCopy.isBookmarked
    this.store.dispatch(updateMovie({id:param.id, changes:deepCopy}))
   }
}
