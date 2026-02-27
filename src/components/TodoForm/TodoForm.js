import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "../Todo/Todo";

const TODOS = "http://localhost:3004/todos";

const TodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // fetch todos using axios -> https://github.com/axios/axios
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(TODOS);
      setTodos(result.data);
    };

    fetchData();
  }, []);

  const isCompleted = (id) => {
    for (let i = 0; i < todos.length; i++) {
      const newTodos = [...todos]
      if (newTodos[i].id === id) {
        newTodos[i].completed = !newTodos[i].completed
      }
      setTodos(newTodos);
    }
  };

  const addTodo = (text) => {
    const newTodo = {
      userId: 1,
      title: text,
      completed: false,
      id: todos.length + 1,
    };
    axios.post(TODOS, newTodo).then(() => setTodos([...todos, newTodo]));
  };

  return (
    <div className="todos">
      {todos.map((todo) => (
        <Todo
          key={`${todo.userId}--${todo.id}`}
          todo={todo}
          isCompleted={isCompleted}
        />
      ))}
      <form>
        <input
          type="text"
          placeholder="Add todo"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            addTodo(text);
            setText("");
          }}
        >
          Add todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
