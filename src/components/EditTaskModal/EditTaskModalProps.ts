import type { Task } from "../../services/types"

export type ModalProps ={
    editTaskModalVisible: boolean,
    setEditTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    editTaskModalTask: Task | undefined
    updateTaskInTasksArray: (newTask: Task, arrayModified: "ToDo" | "InProgress" | "Done") => void
}