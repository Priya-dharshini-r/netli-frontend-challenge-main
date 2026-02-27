import React from "react";
import "./Todo.css";

const Todo = ({ todo, isCompleted }) => {
  const inputId = `todo--${todo.userId}--${todo.id}`;

  return (
    <li className={`todo${todo.completed ? " todo--completed" : ""}`}>
      <input
        type="checkbox"
        id={inputId}
        name={todo.title}
        checked={todo.completed}
        onChange={() => isCompleted(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
      />
      <label htmlFor={inputId}>{todo.title}</label>
    </li>
  );
};

export default Todo;
