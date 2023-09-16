import { fireEvent, queryByAttribute, queryByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isTemplateExpression } from 'typescript';
import App from './App';

// describe("TEST APP", () => {

//   test('App component rendered', () => {
//     render(<App />);
//     const header = screen.getByTestId(/App/i);
//     expect(header).toBeInTheDocument();
//   });

//   test('Can add a task', () => {
//     render(<App />);
//     const addBtn = screen.getByTestId("add-btn");
//     expect(addBtn).toBeInTheDocument();
//     const inputElem = screen.getByPlaceholderText(/что нужно сделать/i);
//     expect(inputElem).toBeInTheDocument();
//     userEvent.type(inputElem, "New task")
//     expect(inputElem).toHaveValue("New task")
//     userEvent.click(addBtn)
//     const newTask = screen.getByTestId("new-task")
//     expect(newTask).toBeInTheDocument()
//   });

//   test('Can "complete" task', () => {
//     const getById = queryByAttribute.bind(null, 'id');
//     const { container } = render(<App />)
//     const dom = render(<App />);
//     // const completeBtn = getById(dom.container, "checkbox-true")
//     const svgBtn = container.querySelector("[data-testid='checkbox-true']") as HTMLImageElement
//     // expect(queryByTestId(svgBtn, "checkbox-true")).toBeInTheDocument()
//     expect(svgBtn.classList.toString()).toContain("checkbox-true");

//   });

//   test('Can delete task', () => {

//   });
// })

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
