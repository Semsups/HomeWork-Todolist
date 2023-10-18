import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { filteredType } from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string)=>void
    filterTask: (value: filteredType)=>void
    addTask: (title: string)=>void
    changeStatusTask: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const addTaskCallBack = () => {
        if(title.trim() !== '')
        {props.addTask(title.trim())
        setTitle('')}
    }

    const onChangeCallBack = (event:ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }

    const keyPressCallBack = (event:KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                addTaskCallBack()
            }
    }

    const filterTaskALL = () => {
        props.filterTask('All')
    }

    const filterTaskActive = () => {
        props.filterTask('Active')
    }

    const filterTaskCompleted = () => {
        props.filterTask('Completed')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} 
                   onChange={onChangeCallBack}
                   onKeyPress={keyPressCallBack}/>
            <button onClick={addTaskCallBack}>+</button>
        </div>
        <ul>
            {props.tasks.map((el)=>{

            const deleteTaskCallBack = () => {
                    props.deleteTask(el.id)
                }

                return(<li key={el.id}>
                    <input type="checkbox" 
                           checked={el.isDone}
                           onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                            let newStatus = event.currentTarget.checked
                            props.changeStatusTask(el.id, newStatus)
                           }}/> 
                    <span>{el.title}</span>
                    <button onClick={deleteTaskCallBack}>x</button>
                    </li>)
            })}
        </ul>
        <div>
            <button onClick={filterTaskALL}>All</button>
            <button onClick={filterTaskActive}>Active</button>
            <button onClick={filterTaskCompleted}>Completed</button>
        </div>
    </div>
}
