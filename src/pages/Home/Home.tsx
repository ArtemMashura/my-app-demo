import { useEffect, useState } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { BoardService } from '../../services/board/board.service';
import { setBoards } from '../../store/Boards';
import CreateBoardModal from '../../components/CreateBoardModal/CreateBoardModal';
import type { Board } from '../../services/board/types';
import EditBoardModal from '../../components/EditBoardModal/EditBoardModal';
import DeleteBoardModal from '../../components/DeleteBoardModal/DeleteBoardModal';
import { Link } from 'react-router-dom';

export function Home() {
    const boards = useSelector((state: RootState) => state.board.boards)
  // const [filteredBoards, setFilteredBoards] = useState<Array<Board>>([]);
  const dispatch = useDispatch()
  
  const [searchTerm, setSearchTerm] = useState('')

  const [createBoardModalVisible, setCreateBoardModalVisible] = useState(false)

  const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(false)
  const [editBoardModalBoard, setEditBoardModalBoard] = useState<Board>()

  const [isDeleteBoardModalVisible, setIsDeleteBoardModalVisible] = useState(false)
  const [deleteBoardModalBoardID, setDeleteBoardModalBoardID] = useState('')
  
  const filteredBoards = boards.filter(board =>
    board.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await BoardService.getAllBoards()
        console.log(data.data.boards)
        dispatch(setBoards(data.data.boards))
      }
      catch (e) {
        console.log(e)
      }
    }

    fetch()
  }, [dispatch]);
    return (
        <>
          <CreateBoardModal 
          createBoardModalVisible={createBoardModalVisible}
          setCreateBoardModalVisible={setCreateBoardModalVisible}
          />

          <EditBoardModal
          editBoardModalVisible={isEditBoardModalVisible}
          setEditBoardModalVisible={setIsEditBoardModalVisible}
          editBoardModalBoard={editBoardModalBoard}
          />

          <DeleteBoardModal 
          isDeleteBoardModalVisible={isDeleteBoardModalVisible}
          setIsDeleteBoardModalVisible={setIsDeleteBoardModalVisible}
          deleteBoardModalBoardID={deleteBoardModalBoardID}
          />

          <div className='search'>
            <input className='input' onChange={e => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Enter table name'></input>
            {/* <div className='button' onClick={handleSearch}>
              <text>Search</text>
            </div> */}
          </div>
          <div className='boards'>
            {filteredBoards.map((boardToRender) => (
              <Link to={`/board/${boardToRender.id}`}>
                <div className='boardContainer' key={boardToRender.id}>
                    <text className='tableName'>{boardToRender.name}</text>
                    <div className='controls'>
                    <img className='editBtn' width={25} height={25} src={'./src/assets/edit-tool-pencil.svg'} onClick={() => {
                        setEditBoardModalBoard(boardToRender)
                        setIsEditBoardModalVisible(true)
                    }}></img>
                    <p></p>
                    <img className='deleteBtn' width={25} height={25} src={'./src/assets/delete-button.svg'} onClick={() => {
                        setDeleteBoardModalBoardID(boardToRender.id)
                        setIsDeleteBoardModalVisible(true)
                    }}></img>
                    </div>
                </div>

              </Link>
            ))}
            <div onClick={() => setCreateBoardModalVisible(true)} className='createBoardContainer'>
              <text className='createTableName'>Create new board</text>
              {/* <div className='controls'>
                <img width={25} height={25} src={'./src/assets/edit-tool-pencil.svg'}></img>
                <p></p>
                <img width={25} height={25} src={'./src/assets/delete-button.svg'}></img>
              </div> */}
            </div>
          </div>
        </>
    )
}