import React, { FC, useContext, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineCheckCircleOutline, MdRadioButtonUnchecked } from 'react-icons/md';
import { ITodo } from '../../models/models';
import { TodosContext } from '../context/Context';
import cl from "./TodoItem.module.css"

interface TodoItemProps {
    todo: ITodo,
    index: number
}

const TodoItem: FC<TodoItemProps> = ({todo, index}) => {
    const [edit, setEdit] = useState<number | null>(null)
    const [value, setValue] = useState<string>("")
    const todos = useContext(TodosContext)

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

    return (
<div className={cl.todo} data-testid={ todo.title }>
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
    );
};

export default TodoItem;