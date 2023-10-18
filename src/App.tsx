import React, { useState } from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';


export type filteredType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState ([
        { id:  v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ] )


    const deleteTask = (id: string) => {
        setTasks(tasks.filter(el=>el.id != id))
    }


    let [filter, setFilter] = useState('all')
    
    let filteredTask = tasks

    if (filter === 'Active') {
        filteredTask = tasks.filter(el=>el.isDone === false)
    }

    if (filter === 'Completed') {
        filteredTask = tasks.filter(el=>el.isDone === true)
    }

    const filterTask = (value: filteredType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let newTask = {id:v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])
    }

    const changeStatusTask = (id: string, isDone: boolean) => {
        let task = tasks.find(el=>el.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }


    return (
        <div className="App">
            <Todolist 
                    title="What to learn" 
                    tasks={filteredTask}
                    deleteTask={deleteTask}
                    filterTask={filterTask} 
                    addTask={addTask}
                    changeStatusTask={changeStatusTask}/>
        </div>
    );
}

export default App;
