import { useNavigate, useParams } from "react-router-dom";
import "./Board.css"
import { useEffect, useState } from "react";
import { BoardService } from "../../services/board/board.service";
import type { Board, Task } from "../../services/types";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import DeleteTaskModal from "../../components/DeleteTaskModal/DeleteTaskModal";
import type { DragEvent } from "react";

// import type {
//   Announcements,
//   DndContextProps,
//   DragEndEvent,
//   DragOverEvent,
//   DragStartEvent,
// } from "@dnd-kit/core"
// import {
//   closestCenter,
//   DndContext,
//   DragOverlay,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   useDroppable,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core"

export function BoardPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [board, setBoard] = useState<Board>()
  const [toDoTasks, setToDoTasks] = useState<Task[]>([])
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([])
  const [doneTasks, setDoneTasks] = useState<Task[]>([])
  const [isInit, setIsInit] = useState(false)

  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false)

  const [editTaskModalTask, setEditTaskModalTask] = useState<Task>()
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false)

  const [deleteTaskModalTaskID, setDeleteTaskModalTaskID] = useState('')
  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] = useState(false)

  const [currentBoard, setCurrentBoard] = useState<Task[]>()
  const [currentItem, setCurrentItem] = useState<Task>()

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.target instanceof Element) {
      if (e.target.className === 'taskContainer' || e.target.className === 'categoryContainer') {
        e.currentTarget.style.boxShadow = '0 2px 3px gray'
      }

    }
  }

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    if (e.target instanceof Element) {
      if (e.target.className === 'taskContainer' || e.target.className === 'categoryContainer') {
        e.currentTarget.style.boxShadow = 'none'
      }
    }
  }

  const dragStartHandler = (board:Task[], item:Task) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    if (e.target instanceof Element) {
      if (e.target.className === 'taskContainer' || e.target.className === 'categoryContainer') {
        e.currentTarget.style.boxShadow = 'none' 
      }
    }
  }

  const dropHandler = (e: DragEvent<HTMLDivElement>,  board:Task[], item:Task) => {
    e.preventDefault()
    if (currentBoard && currentItem) {
      console.log(currentBoard)
      console.log(board)
      if (currentBoard === board) {
        const tempBoard = [...board]
        console.log(12312312132)
        const itemIndex = tempBoard.indexOf(item)

        let lowerNum: number
        let higherNum: number

        if (tempBoard[itemIndex]?.orderInTable) {
          lowerNum = Number(tempBoard[itemIndex].orderInTable)
        }
        else { 
          lowerNum = 0
        }
   
        if (tempBoard[itemIndex+1]?.orderInTable) {
          higherNum = Number(tempBoard[itemIndex+1].orderInTable)
        }
        else {
          higherNum = 1
        }
        const newVal = (lowerNum + higherNum) / 2
        
        const tempItem = {
          ...currentItem,
          orderInTable: newVal.toString(),
          taskProgress: item.taskProgress
        }

        tempBoard.splice(itemIndex+1, 0, tempItem)
        
        // const temp = board[itemIndex]
        // board[itemIndex] = board[currentItemIndex]
        // board[currentItemIndex] = temp

        // [board[itemIndex], board[currentItemIndex]] = [board[currentItemIndex], board[itemIndex]];

        const currentItemIndex = tempBoard.indexOf(currentItem)
        tempBoard.splice(currentItemIndex, 1)

        switch (item.taskProgress) {
          case "ToDo":
            setToDoTasks(tempBoard)
            break
          case "InProgress":
            setInProgressTasks(tempBoard)
            break
          case "Done":
            setDoneTasks(tempBoard) 
            break
        }
      }
      else {
        const currentIndex = currentBoard.indexOf(currentItem)
        const tempboard = currentBoard.toSpliced(currentIndex, 1)
  
        
        const dropIndex = board.indexOf(item)
        let newVal: number = 0.5
  
        if (board.length === 1) {
          // if (dropIndex === 0) {
          //   newVal = Number(board[0].orderInTable) / 2 
          // }
          if (dropIndex === 0) {
            newVal = (Number(board[0].orderInTable) + 1) / 2
          }
        }
        else { 
          console.log("2 or more members")
          let lowerNum: number
          let higherNum: number
  
          if (board[dropIndex]?.orderInTable) {
            lowerNum = Number(board[dropIndex].orderInTable)
          }
          else { 
            lowerNum = 0
          }
   
          if (board[dropIndex+1]?.orderInTable) {
            higherNum = Number(board[dropIndex+1].orderInTable)
          }
          else {
            higherNum = 1
          }
          newVal = (lowerNum + higherNum) / 2
        }
  
        let currentItemOldBoard = currentItem.taskProgress
  
        // setCurrentItem({
        //   ...currentItem,
        //   orderInTable: newVal.toString(),
        //   taskProgress: item.taskProgress
        // })
   
        const tempItem = {
          ...currentItem,
          orderInTable: newVal.toString(),
          taskProgress: item.taskProgress
        }
  
        console.log(tempItem)
  
        board.splice(dropIndex + 1, 0, tempItem)
  
        if (currentItemOldBoard === item.taskProgress) {
          console.log(tempboard)
          console.log(board)
        }
        else {
  
          switch (currentItemOldBoard) {
            case "ToDo":
              setToDoTasks(tempboard)
              break
            case "InProgress":
              setInProgressTasks(tempboard)
              break
            case "Done":
              setDoneTasks(tempboard)
              break
          }
    
          switch (item.taskProgress) {
            case "ToDo":
              setToDoTasks(board)
              break
            case "InProgress":
              setInProgressTasks(board)
              break
            case "Done":
              setDoneTasks(board)
              break
          }
        }
      }

      }
    if (e.target instanceof Element) {
      if (e.target.className === 'taskContainer' || e.target.className === 'categoryContainer') {
        e.currentTarget.style.boxShadow = 'none'
      }
    }
  }

  const dropCardHandler = (e: DragEvent<HTMLDivElement>,  board:Task[], boardTaskProgress: "ToDo" | "InProgress" | "Done") => {
    if (board.length === 0) {
      if (currentBoard && currentItem) {
        const currentIndex = currentBoard.indexOf(currentItem)
        currentBoard.splice(currentIndex, 1)
  
        const currentItemOldBoard = currentItem.taskProgress
  
        const tempItem = {
          ...currentItem,
          orderInTable: '0.5',
          taskProgress: boardTaskProgress
        }
  
        console.log(tempItem)
  
        const tempBoard: Task[] = [tempItem]
  
        switch (currentItemOldBoard) {
          case "ToDo":
            setToDoTasks(currentBoard)
            break  
          case "InProgress":
            setInProgressTasks(currentBoard)
            break
          case "Done":
            setDoneTasks(currentBoard)
            break
        }
  
        switch (boardTaskProgress) {
          case "ToDo":
            console.log("inserting into empty ToDo")
            setToDoTasks(tempBoard)
            break
          case "InProgress":
            console.log("inserting into empty InProgress")
            setInProgressTasks(tempBoard)
            break
          case "Done":
            console.log("inserting into empty Done")
            setDoneTasks(tempBoard) 
            break
        }
      }
      if (e.target instanceof Element) {
        if (e.target.className === 'taskContainer' || e.target.className === 'categoryContainer') {
          e.currentTarget.style.boxShadow = 'none'
        }
      }

    }
  }

  const pushNewTaskIntoToDoTasksArray = (newTask: Task) => {
    setToDoTasks([
      ...toDoTasks,
      newTask
    ])
  }

  const updateTaskInTasksArray = (newTask: Task, arrayModified: "ToDo" | "InProgress" | "Done") => {
    switch (arrayModified) {
      case "ToDo": {
        const newToDoTasks = toDoTasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask
          }
          else {
            return task
          }
        })
        setToDoTasks(newToDoTasks)
        break

      }
      case "InProgress":{
        const newInProgressTasks = inProgressTasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask
          }
          else {
            return task
          }
        })
        setInProgressTasks(newInProgressTasks)
        break
      }
      case "Done": {
        const newDoneTasks = doneTasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask
          }
          else {
            return task
          }
        })
        setDoneTasks(newDoneTasks)
        break
      }
    }
  }

  const deleteTaskInTasksArray = (removedTaskID: string, arrayModified: "ToDo" | "InProgress" | "Done") => {
    switch (arrayModified) {
      case "ToDo": {
        setToDoTasks(toDoTasks.filter(task => 
          task.id !== removedTaskID
        ))
        break
      }
      case "InProgress":{
        setInProgressTasks(inProgressTasks.filter(task => 
          task.id !== removedTaskID
        ))
        break
      }
      case "Done": {
        setDoneTasks(doneTasks.filter(task => 
          task.id !== removedTaskID
        ))
        break
      }
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setIsInit(false)
      setBoard(undefined)
      if (id) {
        try {
          const data = await BoardService.getOneBoard(id)
          console.log(data.data.board)
          setBoard(data.data.board)
          const toDoTemp: Task[] = []
          const inProgressTemp: Task[] = []
          const doneTemp: Task[] = []

          if (data.data.board.tasks) {
            data.data.board.tasks.forEach(task => {
              switch (task.taskProgress) {
                case "ToDo":
                  toDoTemp.push(task)
                  break
                case "InProgress":
                  inProgressTemp.push(task)
                  break
                case "Done":
                  doneTemp.push(task)
                  break
              }
            });
            toDoTemp.sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable));
            setToDoTasks(toDoTemp)

            inProgressTemp.sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable));
            setInProgressTasks(inProgressTemp)

            doneTemp.sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable));
            setDoneTasks(doneTemp)
          }
        }
        catch (e) {
          console.log(e)
        }

      }
      setIsInit(true)
    }
  
    fetch()
  }, [id]);

  const handleSearch = () => {
    if (searchTerm !== "") {
      setIsInit(false)
      setBoard(undefined)
      navigate(`/board/${searchTerm}`)

    } 
  }

  if (isInit && id && board) {
    return (
      <>
        
            <CreateTaskModal
            createTaskModalVisible={createTaskModalVisible}
            setCreateTaskModalVisible={setCreateTaskModalVisible}
            boardUUID={id}
            toDoLastElementOrderInTable={toDoTasks.at(-1)?.orderInTable}
            pushNewTaskIntoToDoTasksArray={pushNewTaskIntoToDoTasksArray}
            />

            <EditTaskModal
            editTaskModalVisible={isEditTaskModalVisible}
            setEditTaskModalVisible={setIsEditTaskModalVisible}
            editTaskModalTask={editTaskModalTask}
            updateTaskInTasksArray={updateTaskInTasksArray}
            />

            <DeleteTaskModal
            isDeleteTaskModalVisible={isDeleteTaskModalVisible}
            setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
            deleteTaskModalTaskID={deleteTaskModalTaskID}
            deleteTaskInTasksArray={deleteTaskInTasksArray}
            />

            <div className="mainContainer">
              <div className='search'>
                <input className='boardSearch' onChange={e => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Enter a board ID here...'></input>
                <div className='button' onClick={handleSearch}>
                  <text>Load</text>
                </div>
              </div>
  
              <div className='categories'>
                <div className="taskColumn">
                  <text className='categoryName'>To Do</text>
                  <div className='categoryContainer'  
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDrop={(e) => dropCardHandler(e, toDoTasks, "ToDo")}>
                    {toDoTasks.map((task) => (
                      <>
                        <div className="taskContainer"
                        draggable={true}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragStart={() => dragStartHandler(toDoTasks, task)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDrop={(e) => dropHandler(e, toDoTasks, task)}
                        >
                          <div className="nameColumn" key={task.id}>
                            <text className="taskName">{task.title}</text>
                            <text className="taskDescription">{task?.description}</text>
                            <text className="taskName">{task.orderInTable}</text>
                            <text className="taskName">{task.taskProgress}</text>
                          </div>
                          <div className='taskControls'>
                            <img className='editBtn' width={25} height={25} src={'./src/assets/edit-tool-pencil.svg'} onClick={() => {
                              setEditTaskModalTask(task)
                              setIsEditTaskModalVisible(true)
                            }}></img>
                            <p></p>
                            <img className='deleteBtn' width={25} height={25} src={'./src/assets/delete-button.svg'} onClick={() => {
                              setDeleteTaskModalTaskID(task.id)
                              setIsDeleteTaskModalVisible(true)
                            }}></img>
                          </div>
                          
                        </div>

                      
                      </>
                    ))}
                    <div className="createTask" onClick={() => setCreateTaskModalVisible(true)}>
                      <img className='createTaskBtn' width={50} height={50} src={'./src/assets/plus-thin.svg'}></img>
                    </div>
                  </div>
                  
                </div>
  
                <div className="taskColumn">
                  <text className='categoryName'>In Progress</text>
                  <div className='categoryContainer'
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDrop={(e) => dropCardHandler(e, inProgressTasks, "InProgress")}
                  >
                    
                    {inProgressTasks.map((task) => (
                      <>
                        <div className="taskContainer" 
                        draggable={true}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragStart={() => dragStartHandler(inProgressTasks, task)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDrop={(e) => dropHandler(e, inProgressTasks, task)}
                        >
                          <div className="nameColumn" key={task.id}>
                            <text className="taskName">{task.title}</text>
                            <text className="taskDescription">{task?.description}</text>
                            <text className="taskName">{task.orderInTable}</text>
                            <text className="taskName">{task.taskProgress}</text>
                          </div>
                          <div className='taskControls'>
                            <img className='editBtn' width={25} height={25} src={'./src/assets/edit-tool-pencil.svg'} onClick={() => {
                              setEditTaskModalTask(task)
                              setIsEditTaskModalVisible(true)
                            }}></img>
                            <p></p>
                            <img className='deleteBtn' width={25} height={25} src={'./src/assets/delete-button.svg'} onClick={() => {
                              setDeleteTaskModalTaskID(task.id)
                              setIsDeleteTaskModalVisible(true)
                            }}></img>
                          </div>
                          
                        </div>

                      
                      </>
                    ))}
                  </div>
  
                </div>
  
                <div className="taskColumn">
                  <text className='categoryName'>Done</text>
                  <div className='categoryContainer'
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDrop={(e) => dropCardHandler(e, doneTasks, "Done")}
                  >
                    {doneTasks.map((task) => (
                      <>
                        <div className="taskContainer" 
                        draggable={true}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragStart={() => dragStartHandler(inProgressTasks, task)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDrop={(e) => dropHandler(e, inProgressTasks, task)}
                        >
                          <div className="nameColumn" key={task.id}>
                            <text className="taskName">{task.title}</text>
                            <text className="taskDescription">{task?.description}</text>
                            <text className="taskName">{task.orderInTable}</text>
                            <text className="taskName">{task.taskProgress}</text>
                          </div>
                          <div className='taskControls'>
                            <img className='editBtn' width={25} height={25} src={'./src/assets/edit-tool-pencil.svg'} onClick={() => {
                              setEditTaskModalTask(task)
                              setIsEditTaskModalVisible(true)
                            }}></img>
                            <p></p>
                            <img className='deleteBtn' width={25} height={25} src={'./src/assets/delete-button.svg'} onClick={() => {
                              setDeleteTaskModalTaskID(task.id)
                              setIsDeleteTaskModalVisible(true)
                            }}></img>
                          </div>
                          
                        </div>

                      
                      </>
                    ))}
                  </div>
  
                </div>
              </div>
              
            </div>
      </>
    )
  }
  if (!id) {
    return (
      <text>No ID was provided</text>
    )
  }
  if (!board && isInit === true) {
    return (
      <text>No such board exists</text>
    )
  }
}