import React, { useState } from "react";

function Auth({ isAuthticated, setIsAuthticated }) {
  const [authMessage, setAuthMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthticated(true);
        }
        return res.json();
      })
      .then((data) => setAuthMessage(data.message))
      .catch((err) => console.error(err));
  };

  const handleCheckAuth = () => {
    fetch("/api/users/check-auth")
      .then((res) => res.json())
      .then((data) => setAuthMessage(data.message))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    fetch("/api/users/logout")
      .then((res) => {
        if (res.status === 200) {
          setIsAuthticated(false);
        }
        return res.json();
      })
      .then((data) => setAuthMessage(data.message))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>{authMessage || "Authentication pending..."}</h1>
      <div>
        {!isAuthticated && (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
          </>
        )}
        <br />
        <button onClick={handleCheckAuth}>Check Authentication</button>
        {isAuthticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}

export default Auth;
