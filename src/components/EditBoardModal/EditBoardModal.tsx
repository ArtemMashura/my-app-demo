import { useState } from "react";
import "./EditBoardModal.css";
import type { ModalProps } from "./EditBoardModalProps";
import { BoardService } from "../../services/board/board.service";
import { useDispatch } from "react-redux";
import { changeBoard } from "../../store/Boards";

export default function EditBoardModal({editBoardModalVisible, setEditBoardModalVisible, editBoardModalBoard} : ModalProps) {
    const dispatch = useDispatch()

    const [tableName, setTableName] = useState(editBoardModalBoard?.name)
    const [isLockedOut, setIsLockedOut] = useState(false)
    const [isInit, setIsInit] = useState(false)
      
    const closeModal = () => {
        if (!isLockedOut) {
            setEditBoardModalVisible(false);
            setIsInit(false)
        }
    };

    //const [prevEditBoardModalBoard, setPrevEditBoardModalBoard] = useState(editBoardModalBoard);

    if (editBoardModalBoard?.name !== tableName) {
        if (editBoardModalBoard?.name && !isInit) {
            setIsInit(true)
            console.log("changed")
            setTableName(editBoardModalBoard?.name);
        }
    }

    const handlePatchBoard = async () => {
        if (tableName === '') {
            return
        }
        else if (!isLockedOut) {
            if (editBoardModalBoard?.id) {
                    setIsLockedOut(true)
                    const res = await BoardService.patchUpdateBoard(editBoardModalBoard?.id, { // це краще робити через форм дату
                        name: tableName,                                                       // але для демо можно і так
                    })
                    dispatch(changeBoard(res.data.updatedBoard))
                    setIsLockedOut(false)
                    closeModal()

            }
        }
    }

    if(editBoardModalVisible) {
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
        {editBoardModalVisible && (
        <div className="modal">
            <div onClick={closeModal} className="overlay"></div>
            <div className="modal-content">
                <div className="header">
                    <text className="title">Edit board</text>
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
                        isLockedOut || tableName === "" ? "applyChangesBtnLockedOut" : "applyChangesBtn"
                    } onClick={handlePatchBoard}>
                        <text className="applyChangesBtnText">Edit board</text>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}