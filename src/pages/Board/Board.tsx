import { useNavigate, useParams } from "react-router-dom";
import "./Board.css"
import { useEffect, useMemo, useState } from "react";
import { BoardService } from "../../services/board/board.service";
import type { Board, Task } from "../../services/types";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import DeleteTaskModal from "../../components/DeleteTaskModal/DeleteTaskModal";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent } from "@dnd-kit/core";
import { Column } from "../../components/Column/Column";
import { TaskService } from "../../services/task/task.service";


export function BoardPage() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [board, setBoard] = useState<Board>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isInit, setIsInit] = useState(false)

  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false)

  const [editTaskModalTask, setEditTaskModalTask] = useState<Task>()
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false)

  const [deleteTaskModalTaskID, setDeleteTaskModalTaskID] = useState('')
  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] = useState(false)

  const tasksIds = useMemo(() => {
    return tasks.map(task => task.id)
  }, [tasks])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3
    }
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
  );


  const pushNewTaskIntoToDoTasksArray = (newTask: Task) => {
    setTasks([
      ...tasks,
      newTask
    ])
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"

    if (!isActiveATask) return

    // is dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)
        const overIndex = tasks.findIndex(t => t.id === overId)

        
        if (tasks[activeIndex].taskProgress !== tasks[overIndex].taskProgress) {
          tasks[activeIndex].taskProgress = tasks[overIndex].taskProgress
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    // is dropping a Task over a column
    const isOverAColumn = over.data.current?.type === "Column"

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id)

        if (overId === "ToDo" || overId === "InProgress" || overId === "Done") {
          tasks[activeIndex].taskProgress = overId
        }


        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active } = event

    if (!active.data.current) return

    const activeId = active.id
    // const overId = over.id

    // console.log(active.data.current)
    // console.log(over.data)

    // if (activeId === overId) return

    const isActiveATask = active.data.current.type === "Task"
    // const isOverATask = over.data.current?.type === "Task"



    if (!isActiveATask) return

    const activeIndex = tasks.filter((t) => t.taskProgress === active.data.current?.task.taskProgress).findIndex(t => t.id === activeId)
    // const overIndex = tasks.findIndex(t => t.id === overId)

    if (isActiveATask 
      // && isOverATask
    ) 
      {

      let lowerVal: number
      let higherVal: number
      
      // console.log(`overIndex ${overIndex}`)
      const filteredTasks = tasks.filter((t) => t.taskProgress === active.data.current?.task.taskProgress)
      // .filter((t) => t.taskProgress === tasks[activeIndex].taskProgress)


      if (filteredTasks.length === 1) {
        lowerVal = 0
        higherVal = 1
      }
      else {
        if (filteredTasks[activeIndex-1]?.orderInTable)
          lowerVal = Number(filteredTasks[activeIndex-1]?.orderInTable)
        else
          lowerVal = 0
  
        if (filteredTasks[activeIndex+1]?.orderInTable)
          higherVal = Number(filteredTasks[activeIndex+1]?.orderInTable)
        else
          higherVal = 1

      }


      // if (lowerVal.toString() === active.data.current?.task.orderInTable) {
      //   console.log('dupe')
      // }

      const newOrderInTable = ((lowerVal + higherVal) / 2).toString()
      
      // tasks[activeIndex].orderInTable = newOrderInTable
      setTasks(tasks => tasks.map((t) => 
        t.id === active.data.current?.task.id
          ?
          {
            ...t,
            orderInTable: newOrderInTable
          }
          : t
      ))

      console.log(active.data.current.task.id)
      console.log(active.data.current.task.taskProgress)
      
      TaskService.patchUpdateTask(active.data.current.task.id, {
        taskProgress: active.data.current.task.taskProgress,
        orderInTable: newOrderInTable
      })
    }

    // const isOverAColumn = over.data.current?.type === "Column"

    // if (isActiveATask && isOverAColumn) {
    //   setTasks((tasks) => {

    //     if (overId === "ToDo" || overId === "InProgress" || overId === "Done") {
    //       tasks[activeIndex].taskProgress = overId
    //     }

    //     tasks[activeIndex].orderInTable = '0.5'

    //     return arrayMove(tasks, activeIndex, activeIndex)
    //   })
    // }

  }

  const updateTaskInTasksArray = (newTask: Task) => {
    const newToDoTasks = tasks.map((task) => {
      if (task.id === newTask.id) {
        return newTask
      }
      else {
        return task
      }
    })
    setTasks(newToDoTasks)
    
  }

  const deleteTaskInTasksArray = (removedTaskID: string) => {
    setTasks(tasks.filter(task => 
      task.id !== removedTaskID
    ))
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

          if (data.data.board.tasks)
          setTasks(data.data.board.tasks.sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable)))
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
    if (searchTerm !== "" && searchTerm !== id) {
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
            toDoLastElementOrderInTable={tasks.filter((task => task.taskProgress === 'ToDo')).sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable)).at(-1)?.orderInTable}
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

            <DndContext

            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            sensors={sensors}
            >
              <div className="mainContainer">
                
                  <div className='search'>
                    <input className='boardSearch' onChange={e => setSearchTerm(e.target.value)} value={searchTerm} placeholder='Enter a board ID here...'></input>
                    <div className='button' onClick={handleSearch}>
                      <text>Load</text>
                    </div>
                  </div>
                  <SortableContext items={tasksIds}>
                    <div className='categories'>
                      <Column
                        tasks={tasks.filter((task) => task.taskProgress === "ToDo")
                          // .sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable))
                        }
                        setEditTaskModalTask={setEditTaskModalTask}
                        setIsEditTaskModalVisible={setIsEditTaskModalVisible}
                        setDeleteTaskModalTaskID={setDeleteTaskModalTaskID}
                        setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
                        setCreateTaskModalVisible={setCreateTaskModalVisible}
                        taskProgress="ToDo"
                      />

                      <Column
                        tasks={tasks.filter((task) => task.taskProgress === "InProgress")
                          // .sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable))

                        }
                        setEditTaskModalTask={setEditTaskModalTask}
                        setIsEditTaskModalVisible={setIsEditTaskModalVisible}
                        setDeleteTaskModalTaskID={setDeleteTaskModalTaskID}
                        setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
                        setCreateTaskModalVisible={setCreateTaskModalVisible}
                        taskProgress="InProgress"
                      />

                      <Column
                        tasks={tasks.filter((task) => task.taskProgress === "Done")
                          // .sort((a,b) => Number(a.orderInTable) - Number(b.orderInTable))
                        }
                        setEditTaskModalTask={setEditTaskModalTask}
                        setIsEditTaskModalVisible={setIsEditTaskModalVisible}
                        setDeleteTaskModalTaskID={setDeleteTaskModalTaskID}
                        setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
                        setCreateTaskModalVisible={setCreateTaskModalVisible}
                        taskProgress="Done"
                      />
                      
                      
                    </div>
                  </SortableContext>

                
              </div>
            </DndContext>
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