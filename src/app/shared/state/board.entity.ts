
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { IBoard } from '../models/board';
import { IMovie } from '../models/movie.interface';

export interface State extends EntityState<IMovie> {
    selectedMovie: IMovie | null;
}

export const boardAdaptor: EntityAdapter<IMovie> = createEntityAdapter<IMovie>(
    {
    selectId: (movie: IMovie) => movie.id,
    sortComparer: (a: IMovie, b: IMovie) => a.title.localeCompare(b.title),
}
);

export const initialBoardState: State = boardAdaptor.getInitialState({
    selectedMovie: null,
});