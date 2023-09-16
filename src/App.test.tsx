import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

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

  test("add todo", () => {
    render(< App />)
    const inputElement = screen.getByPlaceholderText(/что нужно сделать/i);
    const buttonElement = screen.getByTestId("add-btn");
    const todoText = "test todo"
    fireEvent.change(inputElement, { target: { value: todoText } })
    fireEvent.click(buttonElement)

    expect(screen.getByText(todoText)).toBeInTheDocument()
    // expect(screen.getByTestId(todoText)).toBeInTheDocument()
  })

  test("add multiple todo", () => {
    render(< App />)
    const inputElement = screen.getByPlaceholderText(/что нужно сделать/i);
    const buttonElement = screen.getByTestId("add-btn");
    const todoTexts = ["Learn Redux", "Learn Webpack"]
    todoTexts.forEach(todoText => {
      fireEvent.change(inputElement, { target: { value: todoText } })
      fireEvent.click(buttonElement)
    })

    todoTexts.forEach(todoText => {
      expect(screen.getByText(todoText)).toBeInTheDocument()
    })
  })

  test("delete todo", () => {
    render(<App />)
    const inputElement = screen.getByPlaceholderText(/что нужно сделать/i);
    const buttonElement = screen.getByTestId("add-btn");
    const todoText = "Learn Redux"
    fireEvent.change(inputElement, { target: { value: todoText } })
    fireEvent.click(buttonElement)
    expect(screen.queryByText(todoText)).not.toBeInTheDocument()
    const deleteBtn = screen.getByTestId("deleteBtn")
    fireEvent.click(deleteBtn)
    expect(screen.queryByText(todoText)).not.toBeInTheDocument()
  })
})
