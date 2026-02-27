import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

const mockTodo = {
  id: 23,
  completed: false,
  title: "Write tests",
  userId: 3,
};

const completedTodo = {
  id: 24,
  completed: true,
  title: "Finished task",
  userId: 3,
};

test("renders the todo title", () => {
  render(<Todo todo={mockTodo} isCompleted={() => {}} />);
  expect(screen.getByText("Write tests")).toBeInTheDocument();
});

test("renders an unchecked checkbox for incomplete todo", () => {
  render(<Todo todo={mockTodo} isCompleted={() => {}} />);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("renders a checked checkbox for completed todo", () => {
  render(<Todo todo={completedTodo} isCompleted={() => {}} />);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeChecked();
});

test("applies completed class when todo is done", () => {
  const { container } = render(
    <Todo todo={completedTodo} isCompleted={() => {}} />
  );
  expect(container.querySelector(".todo--completed")).toBeInTheDocument();
});

test("does not apply completed class for incomplete todo", () => {
  const { container } = render(
    <Todo todo={mockTodo} isCompleted={() => {}} />
  );
  expect(container.querySelector(".todo--completed")).not.toBeInTheDocument();
});

test("calls isCompleted with the todo id when checkbox is clicked", () => {
  const mockIsCompleted = jest.fn();
  render(<Todo todo={mockTodo} isCompleted={mockIsCompleted} />);
  fireEvent.click(screen.getByRole("checkbox"));
  expect(mockIsCompleted).toHaveBeenCalledTimes(1);
  expect(mockIsCompleted).toHaveBeenCalledWith(mockTodo.id);
});

test("checkbox label is associated with the input", () => {
  render(<Todo todo={mockTodo} isCompleted={() => {}} />);
  // getByLabelText will fail if label is not properly associated
  const checkbox = screen.getByLabelText(/Write tests/i);
  expect(checkbox).toBeInTheDocument();
});

