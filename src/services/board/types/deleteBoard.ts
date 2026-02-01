import type { Board, TRequest } from '../types';

type TResponse = {
    deletedBoard: Board,
    message: string
}

export type TDeleteOneBoardRequest = TRequest<null, TResponse>;
