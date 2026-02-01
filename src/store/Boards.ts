import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Board {
    id: string,
    name: string
}

interface Boards {
    boards: Board[]
}

const initialState: Boards = {
    boards: [],
}

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        setBoards: (state, action: PayloadAction<Board[]>) => {
            state.boards = action.payload
        },
        addBoard: (state, action: PayloadAction<Board>) => {
            state.boards.push(action.payload)
        },
        removeBoard(state, action: PayloadAction<string>) {
            state.boards = state.boards.filter(
                (board) => board.id !== action.payload
            );
        },
        changeBoard(state, action: PayloadAction<Partial<Board>>) {
            const board = state.boards.find(
                (board) => board.id === action.payload.id
            )
            if (board) {
                if (action.payload.name) {
                    board.name = action.payload.name
                }
            }
            // state.boards = state.boards.map(
            //     (board) =>  board.id === action.payload.id ? {...board, text: action.payload}: board
            // );
        },
    }
})

export const { setBoards, addBoard, changeBoard, removeBoard} = boardsSlice.actions

export default boardsSlice.reducer