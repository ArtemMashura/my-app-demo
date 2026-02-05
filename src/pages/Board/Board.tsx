import { useNavigate, useParams } from "react-router-dom";
import "./Board.css"
import { useEffect, useState } from "react";
import { BoardService } from "../../services/board/board.service";
import type { Board, Task } from "../../services/types";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import DeleteTaskModal from "../../components/DeleteTaskModal/DeleteTaskModal";


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
            toDoTemp.sort((a,b) => a.orderInTable - b.orderInTable);
            setToDoTasks(toDoTemp)

            inProgressTemp.sort((a,b) => a.orderInTable - b.orderInTable);
            setInProgressTasks(inProgressTemp)

            doneTemp.sort((a,b) => a.orderInTable - b.orderInTable);
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
                  <div className='categoryContainer'>
                    {toDoTasks.map((task) => (
                      <>
                        <div className="taskContainer">
                          <div className="nameColumn" key={task.id}>
                            <text className="taskName">{task.title}</text>
                            <text className="taskDescription">{task?.description}</text>
                            <text className="taskName">{task.orderInTable}</text>
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
                  <div className='categoryContainer'>
                    
                  </div>
  
                </div>
  
                <div className="taskColumn">
                  <text className='categoryName'>Done</text>
                  <div className='categoryContainer'>
                    
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