import type { Board } from "../../services/board/types"

export type ModalProps ={
    editBoardModalVisible: boolean,
    setEditBoardModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    editBoardModalBoard: Board | undefined
}