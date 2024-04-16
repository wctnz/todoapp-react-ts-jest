import { fireEvent, queryByTestId, render, screen } from '@testing-library/react'
import App from './App';
import TodoItem from './components/todoItem/TodoItem';

describe("TEST APP", () => {

  test("renders heading", () => {
    render(< App />)
    const heading = screen.getByRole("heading", { name: /todos/i });
    expect(heading).toBeInTheDocument()
  })

  test("renders input", () => {
    render(< App />)
    const input = screen.getByPlaceholderText(/что нужно сделать/i);
    expect(input).toBeInTheDocument()
  })

  test("renders addButton", () => {
    render(< App />)
    const button = screen.getByTestId("add-btn");
    expect(button).toBeInTheDocument()
  })

  test("add todo TodoItem", () => {
    const mockTodo = { id: 1, title: "Webpack", done: false }
    render(<TodoItem todo={mockTodo} index={2} />)
    const todoElem = screen.getByTestId("Webpack")
    expect(todoElem).toBeInTheDocument()
  })

  test("delete todo TodoItem", () => {
    const mockTodo = { id: 1, title: "Webpack", done: false }
    render(<TodoItem todo={mockTodo} index={2} />)
    const todoElem = screen.getByTestId("Webpack")
    expect(todoElem).toBeInTheDocument()
    const deleteBtn = screen.getByTestId("delete-btn");
    fireEvent.click(deleteBtn)
    expect(queryByTestId(todoElem, "Webpack")).not.toBeInTheDocument()
  })
})
