// src/pages/LoginPage.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store";

// 목 유저 데이터
const MOCK_USERS = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Login attempt:", { username, password });

    const mockFetch = (url, options) => {
      return new Promise((resolve) => {
        const { username, password } = JSON.parse(options.body);
        const user = MOCK_USERS.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          console.log("User found:", user);
          resolve({
            ok: true,
            json: () => Promise.resolve({ username: user.username }),
          });
        } else {
          console.log("User not found");
          resolve({
            ok: false,
            status: 401,
            json: () => Promise.resolve({ message: "Invalid credentials" }),
          });
        }
      });
    };

    try {
      const response = await mockFetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        dispatch(login({ username: data.username }));
        onLoginSuccess(); // 로그인 성공 시 콜백 호출
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
