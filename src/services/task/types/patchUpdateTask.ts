import type { Task, TRequest } from '../../types';

type TPayload = Partial<Task>

type TResponse = {
    message: string,
    task: Task
}

export type TPatchUpdateTaskRequest = TRequest<TPayload, TResponse>;
