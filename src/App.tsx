import React, { useContext } from 'react';
import AddTodo from './components/addTodo/AddTodo';
import { TodosContext } from './components/context/Context';
import Header from './components/header/Header';
import TodoList from './components/todoList/TodoList';

function App() {

  const todos = useContext(TodosContext)

  return (
    <div className="App" data-testid="App">
      <Header />
      <div className='context'>
      <AddTodo />
      <TodoList />
      </div>
    </div>
  );
}

export default App;
