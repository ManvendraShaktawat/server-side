import React, { useState } from "react";

function saveAuthToken(token) {
  sessionStorage.setItem("authToken", token);
}

export function fetchAuthToken() {
  return sessionStorage.getItem("authToken");
}

function removeAuthToken() {
  return sessionStorage.removeItem("authToken");
}

function Auth({ isAuthticated, setIsAuthticated }) {
  const [authMessage, setAuthMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    handleCheckSession();
  }, []);

  const handleLogin = () => {
    fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthMessage(data.message);
        if (data.token) {
          saveAuthToken(data.token);
          setTimeout(() => setIsAuthticated(true));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCheckSession = () => {
    const token = fetchAuthToken();
    fetch("/api/users/check-session", {
      headers: {
        authorisation: token,
      },
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

  const handleLogout = () => {
    removeAuthToken();
    fetch("/api/users/logout", {
      method: "POST",
    })
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
        {isAuthticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}

export default Auth;
