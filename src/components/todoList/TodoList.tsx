import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ITodo } from '../../models/models';
import { TodosContext } from '../context/Context';
import cl from "./TodoList.module.css"
import { TiDeleteOutline } from 'react-icons/ti';
import { BsCheckCircle } from 'react-icons/bs';
import { ImRadioUnchecked } from 'react-icons/im';
import { MdRadioButtonUnchecked } from 'react-icons/md';
import { MdOutlineCheckCircleOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { BsFillBalloonHeartFill } from 'react-icons/bs';

const TodoList = () => {
    const [edit, setEdit] = useState<number | null>(null)
    const [value, setValue] = useState<string>("")
    const [filtered, setFiltered] = useState<ITodo[] | null>(null)
    const todos = useContext(TodosContext)

    useEffect(()=> {
        setFiltered([...(todos?.todos ?? [])])
    }, [todos?.todos])

    const deleteTodo = (id: number) => {
        todos?.setTodos([...(todos?.todos ?? []).filter(todo => todo.id !== id)])
    }

    const doneTodo = (id: number) => {
        todos?.setTodos([...(todos.todos ?? []).filter(todo => {
            if (todo.id === id) {
                todo.done = !todo.done
            }
            return todo
        })])
    }

    const editTodo = (id: number, title: string) => {
        setEdit(id)
        setValue(title)
    }

    const saveChanges = (id: number) => {
        todos?.setTodos([...(todos.todos ?? []).map(todo => {
            if (todo.id === id) {
                todo.title = value
            }
            return todo
        })])
        setEdit(null)
    }

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
        <div className={cl.main} data-testid="new-task">
            {filtered?.map((todo, index) => (
                <div key={todo.id} className={cl.todo}>
                    <div>
                        {edit === todo.id ?
                            <div>
                                {index + 1}.<input value={value} onChange={(event) => setValue(event.target.value)} />
                                <button onClick={() => saveChanges(todo.id)}>Coхранить</button>
                            </div>
                            :
                            <div className={cl.checkboxPlusTitle}>
                                <div className={cl.checkbox}>
                                    {todo.done ?
                                        <MdOutlineCheckCircleOutline id="checkbox-true" data-testid="checkbox-true" className={cl.checkboxTrue} onClick={() => doneTodo(todo.id)}></MdOutlineCheckCircleOutline>
                                        :
                                        <MdRadioButtonUnchecked className={cl.checkboxFalse} onClick={() => doneTodo(todo.id)}></MdRadioButtonUnchecked>
                                    }
                                </div>
                                {todo.done ?
                                    <div data-testid="new task" className={cl.doneTrue} onClick={() => { editTodo(todo.id, todo.title) }}>{todo.title} </div>
                                    :
                                    <div data-testid="new task" className={cl.doneFalse} onClick={() => { editTodo(todo.id, todo.title) }}>{todo.title} </div>
                                }
                            </div>}
                    </div>
                    <div className={cl.deleteButton}>
                        <AiFillDelete data-testid={`deleteBtn${ todo.title }`} onClick={() => deleteTodo(todo.id)}></AiFillDelete>
                    </div>
                </div>
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

