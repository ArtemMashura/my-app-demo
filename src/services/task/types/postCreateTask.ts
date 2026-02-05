import type { Task, TRequest } from '../../types';

type TPayload = {
    title: string
    description?: string
    boardId: string
    taskProgress?: "ToDo" | "InProgress" | "Done"
    orderInTable: number
};

type TResponse = {
    message: string,
    task: Task
}

export type TPostCreateTaskRequest = TRequest<TPayload, TResponse>;
