import type { AxiosResponse } from 'axios';

export type TResponse<Response = unknown, Config = unknown> = Promise<
  AxiosResponse<Response, Config>
>;

export type TRequest<TPayload, TRes> = {
  payload: TPayload;
  response: AxiosResponse<TRes>;
};

export type TResponseData<Data> = {
  data: Data;
};

export type Board = {
    id: string,
    name: string,
    tasks?: Task[]
}

export type Task = {
    id: string,
    title: string,
    description?: string,
    boardId: string,
    taskProgress: "ToDo" | "InProgress" | "Done"
    orderInTable: string
}