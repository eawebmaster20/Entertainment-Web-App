import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as BoardActions from './board.actions';
import { ApiService } from '../services/api/api.service';
import { v4 as uuidv4 } from 'uuid'
import { Store } from '@ngrx/store';
import { IMovie } from '../models/movie.interface';
import { ILocalStorageUser } from '../models/localStorageUser';
import { DataService } from '../services/data/data.service';
@Injectable()
export class BoardEffects {
  constructor(
    private actions: Actions,
    private storeService: ApiService,
    private dataService: DataService,
    private store: Store
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions.pipe(
      ofType(BoardActions.fetchMovies),
      mergeMap(() => {
        this.dataService.isLoading = true;
        const localStorageBoards = localStorage.getItem('boards');

        if (localStorageBoards) {
          const movies: IMovie[] = JSON.parse(localStorageBoards);
          console.log('data exist in localStorage');
          this.dataService.isLoading = false;
          return of(BoardActions.fetchMoviesSuccess({movies}));
        } else {
          return this.storeService.getMovies().pipe(
            tap((movies: IMovie[]) => {
              console.log('loading from api')
              localStorage.setItem('movies', JSON.stringify(movies));
            }),
            map((movies: IMovie[]) => 
              {
                if(localStorage.getItem('user')){
                  let user = JSON.parse(localStorage.getItem('user')!) as ILocalStorageUser;
                  if (user.authToken.length) {
                    this.dataService.userAuthenticated = true;
                    user.favoriteMovies.forEach(id => {
                      const movie = movies.find(movie => movie.id === id);
                      if(movie) movie.isBookmarked = true;
                    });
                  }
                }
                console.log(movies);
                this.dataService.isLoading = false;
               return BoardActions.fetchMoviesSuccess({ movies })
              }
            ),
            catchError((error) =>
             {
               this.dataService.isLoading = false;
              return of(BoardActions.fetchMoviesFailure())
             } 
            )
          );
        }
      })
    )
  );
}
