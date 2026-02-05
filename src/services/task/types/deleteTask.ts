import type { Task, TRequest } from '../../types';

type TResponse = {
    deletedTask: Task,
    message: string
}

export type TDeleteOneTaskRequest = TRequest<null, TResponse>;
