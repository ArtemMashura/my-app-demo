import { useSortable } from "@dnd-kit/sortable";
import { TaskCard } from "../TaskCard/TaskCard";
import type { ModalProps } from "./ColumnProps";
import "./Column.css"


export function Column({tasks, setEditTaskModalTask, setIsEditTaskModalVisible, setDeleteTaskModalTaskID, setIsDeleteTaskModalVisible, setCreateTaskModalVisible, taskProgress} : ModalProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
    } = useSortable({
        id: taskProgress,
        data: {
            type: "Column",
        },
      })

    // const style = {
    //     transition,
    //     transform: CSS.Transform.toString(transform)
    // }
    
    return (
        <div className="taskColumn"
        ref={setNodeRef}
        // style={style}
        {...attributes}
        {...listeners}
        >
            <text className='categoryName'>{taskProgress}</text>
            <div className='categoryContainer'  
            
            >
                {tasks.map((task) => (
                    <TaskCard
                    task={task}
                    setEditTaskModalTask={setEditTaskModalTask}
                    setIsEditTaskModalVisible={setIsEditTaskModalVisible}
                    setDeleteTaskModalTaskID={setDeleteTaskModalTaskID}
                    setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
                    key={task.id}
                    />
                ))}

                {taskProgress === 'ToDo' &&<div className="createTask" onClick={() => setCreateTaskModalVisible(true)}>
                 <img className='createTaskBtn' width={50} height={50} src={'./src/assets/plus-thin.svg'}></img>
                </div>}
            </div>
            
        </div>
    )
}