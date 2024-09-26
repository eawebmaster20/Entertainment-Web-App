
import { createAction, props } from '@ngrx/store';
import { IMovie } from '../models/movie.interface';

export const fetchMoviesSuccess = createAction('[Board/API] Load Movies', props<{ movies: IMovie[] }>());
export const fetchMoviesFailure = createAction('[Board/API] Load failed');
export const updateMovie = createAction('[Board/API] Update Board', props<{ id: string; changes: Partial<IMovie> }>());
export const fetchMovies = createAction('[Invoice API] Fetch Movies');
export const selectMovie = createAction('[Board] Select Board', props<{ movie: IMovie }>());
export const clearSelectedMovie = createAction('[Board] Clear Selected Board');
