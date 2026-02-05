import { useState } from "react";
import "./EditTaskModal.css";
import type { ModalProps } from "./EditTaskModalProps";
import { TaskService } from "../../services/task/task.service";

export default function EditTaskModal({editTaskModalVisible, setEditTaskModalVisible, editTaskModalTask, updateTaskInTasksArray} : ModalProps) {
    const [taskName, setTaskName] = useState(editTaskModalTask?.title)
    const [taskDescription, setTaskDescription] = useState(editTaskModalTask?.description)
    const [isLockedOut, setIsLockedOut] = useState(false)
    const [isInit, setIsInit] = useState(false)
      
    const closeModal = () => {
        if (!isLockedOut) {
            setEditTaskModalVisible(false);
            setIsInit(false)
        }
    };

    //const [prevEditBoardModalBoard, setPrevEditBoardModalBoard] = useState(editBoardModalBoard);

    if (editTaskModalTask?.title !== taskName) {
        if (editTaskModalTask?.title && !isInit) {
            setIsInit(true)
            console.log("changed")
            setTaskName(editTaskModalTask?.title);
            setTaskDescription(editTaskModalTask?.description)
        }
    }

    const handlePatchBoard = async () => {
        if (taskName === '') {
            return
        }
        else if (!isLockedOut) {
            if (editTaskModalTask?.id) {
                    setIsLockedOut(true)
                    const res = await TaskService.patchUpdateTask(editTaskModalTask?.id, { // це краще робити через форм дату
                        title: taskName,                                                   // але для демо можно і так
                        description: taskDescription
                    })
                    updateTaskInTasksArray(res.data.task, res.data.task.taskProgress)
                    setIsLockedOut(false)
                    closeModal()

            }
        }
    }

    if(editTaskModalVisible) {
    document.body.classList.add('active-modal')
    } else {
    document.body.classList.remove('active-modal')
    }

    // useEffect(() => {
    //     if (editBoardModalVisible === true) {
    //         setTableName(editBoardModalBoard?.name)
    //     }
    // }, [editBoardModalVisible])

    return (
    <>
        {editTaskModalVisible && (
        <div className="modal">
            <div onClick={closeModal} className="overlay"></div>
            <div className="modal-content">
                <div className="header">
                    <text className="title">Edit task</text>
                    <div className={
                        isLockedOut ? "closeModalLockedOut" : "closeModal"
                    } onClick={closeModal}>
                        <img className="close" width={20} height={20} src={'./src/assets/x-thin.svg'}></img>
                    </div>
                </div>
                <div className="content">
                    <text className="paramName">Task name</text>
                    <input className='paramInput' onChange={e => setTaskName(e.target.value)} value={taskName} placeholder='Enter board name'></input>
                    <text className="paramName">Task description</text>
                    <input className='paramInput' onChange={e => setTaskDescription(e.target.value)} value={taskDescription} placeholder='Enter board description'></input>
                    <div className={
                        isLockedOut || taskName === "" ? "applyChangesBtnLockedOut" : "applyChangesBtn"
                    } onClick={handlePatchBoard}>
                        <text className="applyChangesBtnText">Edit task</text>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}