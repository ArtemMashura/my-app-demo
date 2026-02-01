import { apiPrivate } from "../../api/api";
import type { TDeleteOneBoardRequest } from "./types/deleteBoard";
import type { TGetAllBoardsRequest } from "./types/getAllBoards";
import type { TGetOneBoardRequest } from "./types/getOneBoard";
import type { TPatchUpdateTableRequest } from "./types/patchUpdateBoard";
import type { TPostCreateBoardRequest } from "./types/postCreateBoard";


export class BoardService {
  static async getAllBoards(): Promise<TGetAllBoardsRequest['response']> {
    return apiPrivate.get('/board/getAll');
  }

  static async getOneBoard(
    boardUUID: string
  ): Promise<TGetOneBoardRequest['response']> {
    return apiPrivate.get(`/board/get/${boardUUID}`);
  }

  static async postCreateBoard(
    data: TPostCreateBoardRequest["payload"]
  ): Promise<TPostCreateBoardRequest['response']> {
    return apiPrivate.post('/board/create', data);
  }

  static async patchUpdateBoard(
    boardUUID: string,
    data: TPatchUpdateTableRequest["payload"]
  ): Promise<TPatchUpdateTableRequest['response']> {
    return apiPrivate.patch(`/board/update/${boardUUID}`, data);
  }

  static async deleteDeleteBoard(
    boardUUID: string
  ): Promise<TDeleteOneBoardRequest['response']> {
    return apiPrivate.delete(`/board/delete/${boardUUID}`);
  }
}