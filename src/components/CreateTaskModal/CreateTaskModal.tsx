import { useState } from "react";
import "./CreateTaskModal.css";
import type { ModalProps } from "./CreateTaskModalProps";
import { TaskService } from "../../services/task/task.service";

export default function CreateTaskModal({createTaskModalVisible, setCreateTaskModalVisible, boardUUID, toDoLastElementOrderInTable, pushNewTaskIntoToDoTasksArray} : ModalProps) {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [isLockedOut, setIsLockedOut] = useState(false)
      
    const closeModal = () => {
        if (!isLockedOut) {
            setCreateTaskModalVisible(false);

        }
    };

    const handleCreateBoard = async () => {
        if (!isLockedOut) {
            setIsLockedOut(true)
            const res = await TaskService.postCreateTask({
                title: taskName,
                description: taskDescription,
                boardId: boardUUID,
                taskProgress: "ToDo",
                orderInTable: toDoLastElementOrderInTable ? (Number(toDoLastElementOrderInTable) + 1) / 2 : 0.5
            })
            pushNewTaskIntoToDoTasksArray(res.data.task)
            setIsLockedOut(false)
            closeModal()

        }
    }

    if(createTaskModalVisible) {
    document.body.classList.add('active-modal')
    } else {
    document.body.classList.remove('active-modal')
    }

    return (
    <>
        {createTaskModalVisible && (
        <div className="modal">
            <div onClick={closeModal} className="overlay"></div>
            <div className="modal-content">
                <div className="header">
                    <text className="title">Create new task</text>
                    <div className={
                        isLockedOut ? "closeModalLockedOut" : "closeModal"
                    } onClick={closeModal}>
                        <img className="close" width={20} height={20} src={'./src/assets/x-thin.svg'}></img>
                    </div>
                </div>
                <div className="content">
                    <text className="paramName">Task name</text>
                    <input className='taskParamInput' onChange={e => setTaskName(e.target.value)} value={taskName} placeholder='Enter task name'></input>
                    <text className="paramName">Task description</text>
                    <input className='taskParamInput' onChange={e => setTaskDescription(e.target.value)} value={taskDescription} placeholder='Enter task description'></input>
                    <div className={
                        isLockedOut || taskName === "" ? "createBoardBtnLockedOut" : "createBoardBtn"
                    } onClick={handleCreateBoard}>
                        <text className="createBoardBtnText">Create task</text>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}