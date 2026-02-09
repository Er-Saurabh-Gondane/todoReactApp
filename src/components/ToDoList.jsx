import React, { useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todoList, setToDoList }) => {

  const inputRef = useRef();
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    const task = inputRef.current.value.trim();
    if (task === "") return;

    if (editId !== null) {
      setToDoList((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: task } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        isComplete: false,
      };

      setToDoList((prev) => [...prev, newTodo]);
    }

    inputRef.current.value = "";
  };

  const startEdit = (id, text) => {
    inputRef.current.value = text;
    setEditId(id);
  };

  const deleteTodo = (id) => {
    setToDoList((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  const toggle = (id) => {
    setToDoList((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      )
    );
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md mt-20 flex flex-col p-7 rounded-xl">

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To Do List</h1>
      </div>

      {/* Input */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6"
          placeholder="Add your task"
        />

        <button
          onClick={addTask}
          className="rounded-full bg-violet-600 text-white w-32 h-14"
        >
          {editId ? "UPDATE" : "ADD +"}
        </button>
      </div>

      {/* List */}
      <div>
        {todoList.map((item) => (
          <ToDoItem
            key={item.id}
            {...item}
            deleteTodo={deleteTodo}
            toggle={toggle}
            startEdit={startEdit}
          />
        ))}
      </div>

    </div>
  );
};

export default ToDoList;
