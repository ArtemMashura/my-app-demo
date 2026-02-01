import type { Board, TRequest } from '../types';

type TResponse = {
    board: Board
}

export type TGetOneBoardRequest = TRequest<null, TResponse>;
