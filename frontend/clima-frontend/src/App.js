import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import LoginScreen from './components/login';
import SignUpScreen from './components/signup';
import Home from './components/home';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="signup" element={<SignUpScreen />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


const styles = {
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    marginTop: 15,
    color: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFC0CB",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    width: "30%",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
  },
  resultado: {
    fontSize: 30,
    color: "#fff",
    marginTop: 15,
  },
};