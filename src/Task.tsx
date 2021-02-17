import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    task: TaskType
    todolistId: string

}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;

        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.task.id, props.todolistId])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            onChange={onChangeHandler}
            checked={props.task.isDone}
        />
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})