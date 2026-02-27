import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import TodoForm from "./components/TodoForm/TodoForm";

const USERS = "http://localhost:3004/users";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  // fetch todos using axios -> https://github.com/axios/axios
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(USERS);
      setAllUsers(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <img src="/logomark.png" alt="Netlify Logo" />
      <h1>Netlitodo</h1>
      <select name="team">
        {allUsers.map((member) => (
          <option value={member.id}>{member.name}</option>
        ))}
      </select>
      <TodoForm />
    </div>
  );
}

export default App;
