import React, { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import Header from './components/Header'

function App() {

  const [todoList, setToDoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-stone-900 h-screen">
      <Header/>
      <ToDoList todoList={todoList} setToDoList={setToDoList} />
    </div>
  );
}

export default App;
