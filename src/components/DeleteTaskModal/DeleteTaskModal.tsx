import { useState } from "react";
import "./DeleteTaskModal.css";
import type { ModalProps } from "./DeleteTaskModalProps";
import { TaskService } from "../../services/task/task.service";

export default function DeleteTaskModal({isDeleteTaskModalVisible, setIsDeleteTaskModalVisible, deleteTaskModalTaskID, deleteTaskInTasksArray} : ModalProps) {

    const [isLockedOut, setIsLockedOut] = useState(false)
      
    const closeModal = () => {
        if (!isLockedOut) {
            setIsDeleteTaskModalVisible(false);
        }
    };

    const handleDeleteBoard = async () => {
        if (!isLockedOut) {
            if (isDeleteTaskModalVisible) {
                    setIsLockedOut(true)
                    const res = await TaskService.deleteDeleteTask(deleteTaskModalTaskID)
                    deleteTaskInTasksArray(res.data.deletedTask.id, res.data.deletedTask.taskProgress)
                    setIsLockedOut(false)
                    closeModal()

            }
        }
    }

    if(isDeleteTaskModalVisible) {
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
        {isDeleteTaskModalVisible && ( // абсолютний мінімум, у реальному продукті цей модал виглядав би не так
        <div className="modal">
            <div onClick={closeModal} className="overlay"></div>
            <div className="modal-content">
                <div className="header">
                    <text className="title">Delete task</text>
                    <div className={
                        isLockedOut ? "closeModalLockedOut" : "closeModal"
                    } onClick={closeModal}>
                        <img className="close" width={20} height={20} src={'./src/assets/x-thin.svg'}></img>
                    </div>
                </div>
                <div className="content">
                    <div className={
                        isLockedOut ? "deleteBoardBtnLockedOut" : "deleteBoardBtn"
                    } onClick={handleDeleteBoard}>
                        <text className="deleteBoardBtnText">Delete task</text>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}