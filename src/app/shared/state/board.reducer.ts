import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { initialBoardState, boardAdaptor } from './board.entity';

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.fetchMoviesSuccess, (state, { movies }) => boardAdaptor.setAll(movies, state)),
  on(BoardActions.updateMovie, (state, { id, changes }) => boardAdaptor.updateOne({ id, changes }, state)),
  on(BoardActions.selectMovie, (state, { movie }) => ({
    ...state,
    selectedMovie: movie
  })),
  on(BoardActions.clearSelectedMovie, state => ({
    ...state,
    selectedBoard: null
  })),
  
);

export const { selectAll, selectEntities } = boardAdaptor.getSelectors();

