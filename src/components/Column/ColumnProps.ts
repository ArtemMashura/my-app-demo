import type { Task } from "../../services/types"

export type ModalProps ={
    tasks: Task[],
    setEditTaskModalTask: React.Dispatch<React.SetStateAction<Task | undefined>>, 
    setIsEditTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>, 
    setDeleteTaskModalTaskID: React.Dispatch<React.SetStateAction<string>>, 
    setIsDeleteTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>, 
    setCreateTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    taskProgress: "ToDo" | "InProgress" | "Done"
}