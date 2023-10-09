import { Trash } from "phosphor-react";
import './Task.css';

export function Task({
    content, concluded, id, onDeleteTask, onToggleStatusTask
}) {
    function handleDeleteTask() {
        onDeleteTask(id);
    }

    function handleToggleStatusTask() {
        onToggleStatusTask(id);
    }

    return (
        <div key={id} className="task">
            <input
                checked={concluded}
                onChange={handleToggleStatusTask}
                type="checkbox"
            />
            <span>{content}</span>
            <button onClick={handleDeleteTask}>
                <Trash />
            </button>
        </div>
    )
}