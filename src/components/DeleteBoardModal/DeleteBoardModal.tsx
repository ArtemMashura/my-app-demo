import { useState } from "react";
import "./DeleteBoardModal.css";
import type { ModalProps } from "./DeleteBoardModalProps";
import { BoardService } from "../../services/board/board.service";
import { useDispatch } from "react-redux";
import { removeBoard } from "../../store/Boards";

import xThin from '/src/assets/x-thin.svg'

export default function DeleteBoardModal({isDeleteBoardModalVisible, setIsDeleteBoardModalVisible, deleteBoardModalBoardID} : ModalProps) {
    const dispatch = useDispatch()

    const [isLockedOut, setIsLockedOut] = useState(false)
      
    const closeModal = () => {
        if (!isLockedOut) {
            setIsDeleteBoardModalVisible(false);
        }
    };

    const handleDeleteBoard = async () => {
        if (!isLockedOut) {
            if (deleteBoardModalBoardID) {
                    setIsLockedOut(true)
                    const res = await BoardService.deleteDeleteBoard(deleteBoardModalBoardID)
                    dispatch(removeBoard(res.data.deletedBoard.id))
                    setIsLockedOut(false)
                    closeModal()

            }
        }
    }

    if(isDeleteBoardModalVisible) {
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
        {isDeleteBoardModalVisible && ( // абсолютний мінімум, у реальному продукті цей модал виглядав би не так
        <div className="modal">
            <div onClick={closeModal} className="overlay"></div>
            <div className="modal-content">
                <div className="header">
                    <text className="title">Delete board</text>
                    <div className={
                        isLockedOut ? "closeModalLockedOut" : "closeModal"
                    } onClick={closeModal}>
                        <img className="close" width={20} height={20} src={xThin}></img>
                    </div>
                </div>
                <div className="content">
                    <div className={
                        isLockedOut ? "deleteBoardBtnLockedOut" : "deleteBoardBtn"
                    } onClick={handleDeleteBoard}>
                        <text className="deleteBoardBtnText">Delete board</text>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}