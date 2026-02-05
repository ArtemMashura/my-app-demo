export type ModalProps ={
    isDeleteTaskModalVisible: boolean,
    setIsDeleteTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    deleteTaskModalTaskID: string
    deleteTaskInTasksArray: (removedTaskID: string, arrayModified: "ToDo" | "InProgress" | "Done") => void
}