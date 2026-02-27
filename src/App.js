import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import TodoForm from "./components/TodoForm/TodoForm";

const USERS = "http://localhost:3004/users";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(USERS);
      const users = result.data;
      setAllUsers(users);
      if (users.length > 0) {
        setSelectedUserId(String(users[0].id));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <img src="/logomark.png" alt="Netlify Logo" />
        <h1>Netlitodo</h1>
      </header>

      <main className="app-main">
        <div className="team-select-wrapper">
          <label htmlFor="team-select" className="team-label">
            🙌&nbsp;Team
          </label>
          <select
            id="team-select"
            name="team"
            value={selectedUserId ?? ""}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            {allUsers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {selectedUserId && (
          <TodoForm
            allUsers={allUsers}
            selectedUserId={selectedUserId}
          />
        )}
      </main>
    </div>
  );
}

export default App;