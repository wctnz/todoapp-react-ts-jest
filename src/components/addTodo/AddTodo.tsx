import React, { useState } from 'react';
import { useContext } from 'react';
import { ITodo } from '../../models/models';
import { TodosContext } from '../context/Context';
import cl from "./AddTodo.module.css" 
import { IoIosAddCircleOutline } from 'react-icons/io';


const AddTodo = () => {
    const [taskTitle, setTaskTitle] = useState<string>("")
    const todos = useContext(TodosContext)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.target.value)
    }

    const addTodo = () => {
        if (taskTitle) {
        const newTodo: ITodo = {
            id: Date.now(),
            title: taskTitle,
            done: false
        }
        todos?.setTodos([...(todos.todos ?? []), newTodo])
        setTaskTitle("")
    } 
    }

    return (
        <div className={ cl.main }>
            <input data-testid="input-elem" className={ cl.input } placeholder='    Что нужно сделать?' value={ taskTitle } onChange={ handleInputChange }/>
            <IoIosAddCircleOutline data-testid="add-btn" className={ cl.addButton } onClick={addTodo}></IoIosAddCircleOutline>
        </div>
    );
};

export default AddTodo;