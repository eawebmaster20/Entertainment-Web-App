import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as BoardActions from './board.actions';
import { ApiService } from '../services/api/api.service';
import { v4 as uuidv4 } from 'uuid'
import { Store } from '@ngrx/store';
import { IMovie } from '../models/movie.interface';
@Injectable()
export class BoardEffects {

  constructor(
    private actions: Actions,
    private storeService: ApiService,
    private store: Store
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions.pipe(
      ofType(BoardActions.fetchMovies),
      mergeMap(() => {
        const localStorageBoards = localStorage.getItem('boards');

        if (localStorageBoards) {
          const movies: IMovie[] = JSON.parse(localStorageBoards);
          console.log('data exist in localStorage');
          return of(BoardActions.fetchMoviesSuccess({movies}));
        } else {
          return this.storeService.getMovies().pipe(
            // map(res => res.map(board=> ({
            //   ...board,
            //   id: uuidv4()
            // }))), 
            tap((movies: IMovie[]) => {
              console.log('loading from api')
              localStorage.setItem('movies', JSON.stringify(movies));
            }),
            map((movies: IMovie[]) => 
              BoardActions.fetchMoviesSuccess({ movies })
            ),
            catchError((error) =>
              of(BoardActions.fetchMoviesFailure())
            )
          );
        }
      })
    )
  );
}
