import { apiPrivate } from "../../api/api";
import type { TDeleteOneTaskRequest } from "./types/deleteTask";
import type { TPatchUpdateTaskRequest } from "./types/patchUpdateTask";
import type { TPostCreateTaskRequest } from "./types/postCreateTask";


export class TaskService {
  static async postCreateTask(
    data: TPostCreateTaskRequest["payload"]
  ): Promise<TPostCreateTaskRequest['response']> {
    return apiPrivate.post('/task/create', data);
  }

  static async patchUpdateTask(
    taskUUID: string,
    data: TPatchUpdateTaskRequest["payload"]
  ): Promise<TPatchUpdateTaskRequest['response']> {
    return apiPrivate.patch(`/task/update/${taskUUID}`, data);
  }

  static async deleteDeleteTask(
    taskUUID: string
  ): Promise<TDeleteOneTaskRequest['response']> {
    return apiPrivate.delete(`/task/delete/${taskUUID}`);
  }
}