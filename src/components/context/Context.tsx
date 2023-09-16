import { createContext, FC, ReactNode, useState } from "react";
import { ITodo } from "../../models/models";

interface ProviderProps {
    children: ReactNode
}

interface TodosContext {
    todos: ITodo[] | null
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
}

const initialState: ITodo[] = [
{
    id: 1,
    title: "Learn Javascript",
    done: true
},
{
    id: 2,
    title: "Learn Typescript",
    done: false
}
]

export const TodosContext = createContext<TodosContext | null>(null)

export const TodosProvider: FC<ProviderProps> = (props) => {
 const [todos, setTodos] = useState(initialState)
    return (<>
        <TodosContext.Provider value={ { todos, setTodos } }>{ props.children }</TodosContext.Provider>
        </>)
}