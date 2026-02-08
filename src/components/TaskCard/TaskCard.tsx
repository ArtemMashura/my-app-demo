import { useSortable } from "@dnd-kit/sortable";
import './TaskCard.css'
import type { ModalProps } from "./TaskCardProps";
import { CSS } from "@dnd-kit/utilities";

export function TaskCard({task, setEditTaskModalTask, setIsEditTaskModalVisible, setDeleteTaskModalTaskID, setIsDeleteTaskModalVisible} : ModalProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div className="taskContainerSelected"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            >
                {/* <div className="nameColumn" key={task.id}>
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
                </div> */}
                
            </div>
        )
    }

    return (
            <div className="taskContainer"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            >
                <div className="nameColumn" key={task.id}>
                <text className="taskName">{task.title}</text>
                <text className="taskDescription">{task?.description}</text>
                {/* <text className="taskName">{task.orderInTable}</text> */}
                {/* <text className="taskName">{task.taskProgress}</text> */}
                </div>
                <div className='taskControls'>
                <img className='editTaskBtn' width={25} height={25} src={'./src/assets/edit-tool-pencil.svg'} onClick={() => {
                    setEditTaskModalTask(task)
                    setIsEditTaskModalVisible(true)
                }}></img>
                <p></p>
                <img className='deleteTaskBtn' width={25} height={25} src={'./src/assets/delete-button.svg'} onClick={() => {
                    setDeleteTaskModalTaskID(task.id)
                    setIsDeleteTaskModalVisible(true)
                }}></img>
                </div>
                
            </div>

    )
}