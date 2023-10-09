
import { PlusCircle } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react"
import { Task } from '../Task/Task';
import { useTheme } from "../../contexts/ThemeContext";
import './ToDoList.css'


export function ToDoList({ apiTaskList }) {
    const [taskList, setTaskList] = useState(apiTaskList);
    const [newCreatedTaskText, setNewCreatedTaskText] = useState("");

    const { toggleTheme } = useTheme();

    function handleCreateNewTask(event) {
        event.preventDefault();

        const newCreatedTask = {
            content: newCreatedTaskText,
            concluded: false,
            id: taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1
        };

        setTaskList([...taskList, newCreatedTask])
        setNewCreatedTaskText("");
    }

    function handleNewCreatedTaskChange(event) {
        event.target.setCustomValidity("");
        setNewCreatedTaskText(event.target.value);
    }

    function handleNewTaskInvalid(event) {
        event.target.setCustomValidity("Esse campo é obrigatório!");
    }

    const completedTaskCount = useMemo(() => {
        if (taskList.length > 0) {
            return taskList.filter(task => task.concluded === true).length;
        } else {
            return 0;
        }
    }, [taskList])


    const deleteTask = useCallback((taskToDeleteId) => {
        const taskWithoutDeletedOne = taskList.filter((task) => {
            return task.id !== taskToDeleteId;
        })

        setTaskList(taskWithoutDeletedOne);
    }, [taskList])

    const toggleTaskStatus = useCallback((taskToToggleId) => {
        let taskListWithChangedStatusTask = taskList;
        const indexChangedStatusTask = taskListWithChangedStatusTask.findIndex(
            (task) => task.id === taskToToggleId);

        taskListWithChangedStatusTask[indexChangedStatusTask].concluded = !taskListWithChangedStatusTask[indexChangedStatusTask].concluded;

        setTaskList([...taskListWithChangedStatusTask]);
    }, [taskList]);

    useEffect(() => {
        setTaskList(apiTaskList);
    }, [apiTaskList])

    const isNewTaskEmpty = newCreatedTaskText.length === 0;
    const totalNumberTasks = taskList.length;

    return (
        <div className="toDoList">
            <form onSubmit={handleCreateNewTask}>
                <div className="insertNewTask">
                    <button onClick={toggleTheme}>Trocar tema</button>
                    <input
                        placeholder="Adicione uma nova tarefa"
                        value={newCreatedTaskText}
                        onChange={handleNewCreatedTaskChange}
                        onInvalid={handleNewTaskInvalid}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isNewTaskEmpty}
                    >
                        <span>Criar</span>
                        <PlusCircle size={16} />

                    </button>
                </div>
            </form>

            <div className="listContent">
                <header>
                    <div className="createdTaskNumber">
                        Tarefas criadas
                        <span>{totalNumberTasks}</span>
                    </div>

                    <div className="concludedTaskNumber">
                        Concluídas
                        {totalNumberTasks > 0
                            ? (<span>
                                {completedTaskCount} de {totalNumberTasks}
                            </span>)
                            : (<span>0</span>)}
                    </div>
                </header>

            </div >

            {taskList.length > 0 ? (
                <div className="taskList">
                    {taskList.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                id={task.id}
                                content={task.content}
                                concluded={task.concluded}
                                onDeleteTask={deleteTask}
                                onToggleStatusTask={toggleTaskStatus}
                            />
                        )
                    })}
                </div>
            ) : (
                <div>
                    <p>Você ainda não tem tarefas cadastradas.</p>
                </div>
            )
            }
        </div >
    )
}