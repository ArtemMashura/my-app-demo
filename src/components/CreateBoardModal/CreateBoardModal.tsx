import { useState } from "react";
import "./CreateBoardModal.css";
import type { ModalProps } from "./CreateBoardModalProps";
import { BoardService } from "../../services/board/board.service";
import { useDispatch } from "react-redux";
import { addBoard } from "../../store/Boards";

export default function CreateBoardModal({createBoardModalVisible, setCreateBoardModalVisible} : ModalProps) {
    const dispatch = useDispatch()

    const [tableName, setTableName] = useState('')
    const [isLockedOut, setIsLockedOut] = useState(false)
      
    const closeModal = () => {
        if (!isLockedOut) {
            setCreateBoardModalVisible(false);

        }
    };

    const handleCreateBoard = async () => {
        if (tableName === '') {
            return
        }
        else if (!isLockedOut) {
            setIsLockedOut(true)
            const res = await BoardService.postCreateBoard({
                name: tableName
            })
            dispatch(addBoard(res.data.board))
            setIsLockedOut(false)
            closeModal()

        }
    }

    if(createBoardModalVisible) {
    document.body.classList.add('active-modal')
    } else {
    document.body.classList.remove('active-modal')
    }

    return (
    <>
        {createBoardModalVisible && (
        <div className="modal">
            <div onClick={closeModal} className="overlay"></div>
            <div className="modal-content">
                <div className="header">
                    <text className="title">Create new board</text>
                    <div className={
                        isLockedOut ? "closeModalLockedOut" : "closeModal"
                    } onClick={closeModal}>
                        <img className="close" width={20} height={20} src={'./src/assets/x-thin.svg'}></img>
                    </div>
                </div>
                <div className="content">
                    <text className="paramName">Board name</text>
                    <input className='paramInput' onChange={e => setTableName(e.target.value)} value={tableName} placeholder='Enter board name'></input>
                    <div className={
                        isLockedOut || tableName === "" ? "createBoardBtnLockedOut" : "createBoardBtn"
                    } onClick={handleCreateBoard}>
                        <text className="createBoardBtnText">Create board</text>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}