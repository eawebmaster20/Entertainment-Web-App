import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, boardAdaptor } from './board.entity';

export const selectMovieState = createFeatureSelector<State>('movies');

export const {
  selectIds: selectMovieIds,
  selectEntities: selectMovieEntities,
  selectAll: selectAllMovies,
  selectTotal: selectMovieTotal,
} = boardAdaptor.getSelectors(selectMovieState);

export const selectSelectedMovieId = createSelector(
  selectMovieState,
  (state: State) => state
);

export const selectSelectedMovie = createSelector(
  selectMovieState,
  (state: State) => state.selectedMovie
);

