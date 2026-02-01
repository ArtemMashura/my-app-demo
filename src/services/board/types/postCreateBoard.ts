import type { Board, TRequest } from '../types';

type TPayload = {
    name: string
};

type TResponse = {
    message: string,
    board: Board
}

export type TPostCreateBoardRequest = TRequest<TPayload, TResponse>;
