import type { Board } from "../../services/types"

export type ModalProps ={
    editBoardModalVisible: boolean,
    setEditBoardModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    editBoardModalBoard: Board | undefined
}