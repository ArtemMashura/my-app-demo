import type { Task } from "../../services/types"

export type ModalProps ={
    createTaskModalVisible: boolean,
    setCreateTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    boardUUID: string
    toDoLastElementOrderInTable: string | undefined
    pushNewTaskIntoToDoTasksArray: (newTask: Task) => void
}