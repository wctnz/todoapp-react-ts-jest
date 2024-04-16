import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ITodo } from '../../models/models';
import { TodosContext } from '../context/Context';
import cl from "./TodoList.module.css"
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import TodoItem from '../todoItem/TodoItem';

const TodoList = () => {

    type leftTodosType = ITodo[] | undefined

    const [filtered, setFiltered] = useState<ITodo[] | null>(null)
    const [active, setActive] = useState<string>("all")
    const todos = useContext(TodosContext)
    const leftTodos: leftTodosType = todos?.todos?.filter(todo => todo.done !== true)
    
    const todoFilter = (status: string | boolean) => {
        status === "all" ? setFiltered([...(todos?.todos ?? [])])
            :
            status === "clearCompleted" ? todos?.setTodos([...(todos?.todos ?? []).filter(todo => todo.done === false)])
                :
                setFiltered([...(todos?.todos ?? []).filter(todo => todo.done === status)])
    }

    const handleButton = (value: string | boolean, button: string) => {
        todoFilter(value)
        setActive(button)
    }

    useEffect(() => {
        setFiltered([...(todos?.todos ?? [])])
    }, [todos?.todos])

    return (<>
        {filtered?.length === 0 && todos?.todos?.length !== 0 && <p className={cl.firstTask}>Все сделал! <BsFillBalloonHeartFill className={cl.allDone} /></p>}
        {todos?.todos?.length === 0 ? <p className={cl.firstTask}>Добавьте первую задачу</p>
            :
            <div className={cl.main}>
                {filtered?.map((todo, index) => (
                    <TodoItem data-testid={todo.title} todo={todo} index={index} key={todo.title} />
                ))}
                {todos?.todos?.length !== 0 &&
                    <div className={cl.buttomGrouoButtons}>
                        <div className={cl.itemsLeft}>
                        <p>{leftTodos?.length ? `${leftTodos?.length} item left` : "All done!"}</p>
                        </div>
                        <div>
                            <button className={ active==="all" ? `${ cl.btn } ${ cl.active }` : `${cl.btn }` } onClick={() => handleButton("all", "all")}>All</button>
                            <button className={ active==="active" ? `${ cl.btn } ${ cl.active }` : `${cl.btn }` } onClick={() => handleButton(false, "active")}>Active</button>
                            <button className={ active==="complited" ? `${ cl.btn } ${ cl.active }` : `${cl.btn }` } onClick={() => handleButton(true, "complited")}>Completed</button>
                        </div>
                        <div>
                            <button className={cl.btn} onClick={() => todoFilter("clearCompleted")}>Clear completed</button>
                        </div>
                    </div>
                }
            </div>}
    </>);
};

export default TodoList;

