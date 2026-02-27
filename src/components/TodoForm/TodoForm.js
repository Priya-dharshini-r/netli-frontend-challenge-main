import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "../Todo/Todo";

const TODOS = "http://localhost:3004/todos";

const TodoForm = ({ selectedUserId, allUsers }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedUser = allUsers.find((u) => String(u.id) === String(selectedUserId));

  useEffect(() => {
    if (!selectedUserId) return;

    setIsLoading(true);
    setError(null);
    setTodos([]);
    setText("");

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const result = await axios(`${TODOS}?userId=${Number(selectedUserId)}`, {
          signal: controller.signal,
        });
        setTodos(result.data);
      } catch (err) {
        // ERR_CANCELED is what axios throws when an AbortController aborts
        if (err.code === "ERR_CANCELED" || axios.isCancel(err)) return;
        setError("Failed to load todos. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [selectedUserId]);

  const isCompleted = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, completed: !todo.completed };
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));

    try {
      await axios.patch(`${TODOS}/${id}`, { completed: updated.completed });
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticTodo = { id: tempId, userId: Number(selectedUserId), title: trimmed, completed: false };
    setTodos((prev) => [...prev, optimisticTodo]);
    setText("");

    try {
      const result = await axios.post(TODOS, { userId: Number(selectedUserId), title: trimmed, completed: false });
      setTodos((prev) => prev.map((t) => (t.id === tempId ? result.data : t)));
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
      setError("Failed to add todo. Please try again.");
    }
  };

  if (!selectedUser) return null;

  return (
    <section className="todos" aria-label={`${selectedUser.name}'s todos`}>
      <h2 className="todos-heading">
        {selectedUser.name}
        <span className="todos-role">{selectedUser.title}</span>
      </h2>

      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}

      {isLoading ? (
        <p aria-live="polite">Loading todos…</p>
      ) : (
        <ul className="todo-list" aria-label="Todo items">
          {todos.length === 0 && (
            <li className="todo-empty">No todos yet. Add one below!</li>
          )}
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              isCompleted={isCompleted}
            />
          ))}
        </ul>
      )}

      <form className="todo-form" onSubmit={addTodo} noValidate>
        <label htmlFor="new-todo" className="visually-hidden">
          New todo for {selectedUser.name}
        </label>
        <input
          id="new-todo"
          type="text"
          placeholder="Add a todo…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="New todo text"
        />
        <button type="submit" disabled={!text.trim()}>
          Add
        </button>
      </form>
    </section>
  );
};

export default TodoForm;