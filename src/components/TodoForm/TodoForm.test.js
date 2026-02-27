import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import TodoForm from "./TodoForm";

jest.mock("axios");

const mockUser = { id: 1, name: "Leanne Graham", title: "Marketing Manager" };

const mockTodos = [
  { id: 1, userId: 1, title: "schedule posts for social", completed: false },
  { id: 4, userId: 1, title: "publish blog post announcement", completed: true },
];

beforeEach(() => {
  axios.mockResolvedValue({ data: mockTodos });
  axios.post = jest.fn().mockResolvedValue({
    data: { id: 99, userId: 1, title: "new task", completed: false },
  });
  axios.patch = jest.fn().mockResolvedValue({ data: {} });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("shows loading state initially", () => {
  render(<TodoForm selectedUser={mockUser} />);
  expect(screen.getByText(/Loading todos/i)).toBeInTheDocument();
});

test("renders todos for the selected user after fetch", async () => {
  render(<TodoForm selectedUser={mockUser} />);
  await waitFor(() => {
    expect(screen.getByText("schedule posts for social")).toBeInTheDocument();
    expect(screen.getByText("publish blog post announcement")).toBeInTheDocument();
  });
});

test("fetches todos filtered by userId", async () => {
  render(<TodoForm selectedUser={mockUser} />);
  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith(
      expect.stringContaining(`userId=${mockUser.id}`)
    );
  });
});

test("shows user name in the heading", async () => {
  render(<TodoForm selectedUser={mockUser} />);
  await waitFor(() => {
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  });
});

test("Add button is disabled when input is empty", async () => {
  render(<TodoForm selectedUser={mockUser} />);
  await waitFor(() => screen.getByRole("button", { name: /add/i }));
  expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
});

test("Add button is enabled when input has text", async () => {
  render(<TodoForm selectedUser={mockUser} />);
  await waitFor(() => screen.getByRole("textbox"));
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "new task" },
  });
  expect(screen.getByRole("button", { name: /add/i })).not.toBeDisabled();
});

test("submitting the form posts a new todo with the correct userId", async () => {
  render(<TodoForm selectedUser={mockUser} />);
  await waitFor(() => screen.getByRole("textbox"));

  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "new task" },
  });
  fireEvent.click(screen.getByRole("button", { name: /add/i }));

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ userId: mockUser.id, title: "new task" })
    );
  });
});

test("clears input after adding a todo", async () => {
  render(<TodoForm selectedUser={mockUser} />);
  await waitFor(() => screen.getByRole("textbox"));

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "new task" } });
  fireEvent.click(screen.getByRole("button", { name: /add/i }));

  await waitFor(() => {
    expect(input.value).toBe("");
  });
});
