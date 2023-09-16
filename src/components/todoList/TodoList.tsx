import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ITodo } from '../../models/models';
import { TodosContext } from '../context/Context';
import cl from "./TodoList.module.css"
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import TodoItem from '../todoItem/TodoItem';

const TodoList = () => {
    const [filtered, setFiltered] = useState<ITodo[] | null>(null)
    const todos = useContext(TodosContext)

    useEffect(()=> {
        setFiltered([...(todos?.todos ?? [])])
    }, [todos?.todos])

    const todoFilter = (status: string | boolean) => {
        status === "all" ? setFiltered([...(todos?.todos ?? [])]) 
        : 
        status === "clearCompleted" ? todos?.setTodos([...(todos?.todos ?? []).filter(todo => todo.done === false)])
        : 
        setFiltered([...(todos?.todos ?? []).filter(todo => todo.done === status)])
    }

    return (<>
        {filtered?.length === 0 && todos?.todos?.length !== 0 && <p className={cl.firstTask}>Все сделал! <BsFillBalloonHeartFill className={ cl.allDone }/></p>}
        {todos?.todos?.length === 0 ? <p className={cl.firstTask}>Добавьте первую задачу</p>
        :
        <div className={cl.main}>
            {filtered?.map((todo, index) => (
                <TodoItem data-testid={ todo.title } todo={ todo } index={ index } key={ todo.title }/>
            ))}
            { todos?.todos?.length !== 0 && 
            <div className={ cl.buttomGrouoButtons }>
                <div>
                    <button className={cl.btn} onClick={ () => todoFilter("all") }>All</button>
                    <button className={cl.btn} onClick={ () => todoFilter(false) }>Active</button>
                    <button className={cl.btn} onClick={ () => todoFilter(true) }>Completed</button>
                </div>
                <div>
                    <button className={cl.btn} onClick={ () => todoFilter("clearCompleted") }>Clear completed</button>
                </div>
            </div>
            }
        </div>}
    </>);
};

export default TodoList;

