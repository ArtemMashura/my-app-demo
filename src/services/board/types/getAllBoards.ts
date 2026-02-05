import type { Board, TRequest } from '../../types';

type TResponse = {
    boards: Board[]
}

export type TGetAllBoardsRequest = TRequest<null, TResponse>;
