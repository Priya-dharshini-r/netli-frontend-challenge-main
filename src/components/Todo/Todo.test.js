import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

const mockTodo = {
  id: 23,
  isCompleted: false,
  title: "Write tests",
  userId: "3",
};

test("renders todo", () => {
  const { getByText } = render(<Todo todo={mockTodo} />);
  const todoText = getByText(/Write tests/i);
  expect(todoText).toBeInTheDocument();
});
