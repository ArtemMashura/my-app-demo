import type { Board, TRequest } from '../types';

type TPayload = {
    name?: string
};

type TResponse = {
    message: string,
    updatedBoard: Board
}

export type TPatchUpdateTableRequest = TRequest<TPayload, TResponse>;
