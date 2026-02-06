import { useSortable } from "@dnd-kit/sortable";
import { TaskCard } from "../TaskCard/TaskCard";
import type { ModalProps } from "./ColumnProps";
import { CSS } from "@dnd-kit/utilities";

export function Column({tasks, setEditTaskModalTask, setIsEditTaskModalVisible, setDeleteTaskModalTaskID, setIsDeleteTaskModalVisible, setCreateTaskModalVisible, taskProgress} : ModalProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({
        id: taskProgress,
        data: {
            type: "Column",
        },
      })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    
    return (
        <div className="taskColumn"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        >
            <text className='categoryName'>To Do</text>
            <div className='categoryContainer'  
            
            >
                {tasks.filter((task) => task.taskProgress === taskProgress).map((task) => (
                    <TaskCard
                    task={task}
                    setEditTaskModalTask={setEditTaskModalTask}
                    setIsEditTaskModalVisible={setIsEditTaskModalVisible}
                    setDeleteTaskModalTaskID={setDeleteTaskModalTaskID}
                    setIsDeleteTaskModalVisible={setIsDeleteTaskModalVisible}
                    />
                ))}

                {taskProgress === 'ToDo' &&<div className="createTask" onClick={() => setCreateTaskModalVisible(true)}>
                 <img className='createTaskBtn' width={50} height={50} src={'./src/assets/plus-thin.svg'}></img>
                </div>}
            </div>
            
        </div>
    )
}