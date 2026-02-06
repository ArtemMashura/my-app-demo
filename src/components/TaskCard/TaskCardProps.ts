import type { Task } from "../../services/types"

export type ModalProps ={
    task: Task
    setEditTaskModalTask: (value: React.SetStateAction<Task | undefined>) => void
    setIsEditTaskModalVisible: (value: React.SetStateAction<boolean>) => void
    setDeleteTaskModalTaskID: React.Dispatch<React.SetStateAction<string>>
    setIsDeleteTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}